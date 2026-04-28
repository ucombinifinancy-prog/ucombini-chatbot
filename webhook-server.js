/**
 * UCOMBINI Facebook Messenger Webhook Server
 * Express.js server for handling Facebook Messenger callbacks
 */

const express = require('express');
const crypto = require('crypto');
const chatbot = require('./chatbot-flow');

const app = express();
app.use(express.json({ verify: verifyRequestSignature }));

// Configuration - UPDATE THESE
const CONFIG = {
  PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_TOKEN || 'EAAVjTCjNCTgBRfLoNHqFYbMEtb6rZCTxA3jB9mXZAAgjKeyp9wr6gjm7YiqLX21aNU9f4KsMYyPp4BL1KLRVjw2la4i7EGsdHvAuM38ZBUnKglQYdi7HWNM2rlK7JjBiUmhMMXXoyvU36nDZCZBGPLGUac1UQNZARk9ZC6pNGEvWni9lxgiedrUme5iAkafbAZCjvHM96OaC8i8848jnhRG0FLQ0bgZDZD',
  VERIFY_TOKEN: process.env.FACEBOOK_VERIFY_TOKEN || 'ucombini_verify_2026_secure',
  APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'e5a76c0e5e9b3c7a6e3a69f6e3a69f6e3a69f6e',
  PORT: process.env.PORT || 3000
};

// Verify Facebook webhook signature
function verifyRequestSignature(req, res, buf) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    console.warn('No signature in request');
    return;
  }
  
  const elements = signature.split('=');
  const method = elements[0];
  const signatureHash = elements[1];
  const expectedHash = crypto.createHmac('sha256', CONFIG.APP_SECRET)
    .update(buf)
    .digest('hex');
  
  if (signatureHash !== expectedHash) {
    throw new Error("Couldn't validate request signature.");
  }
}

// Webhook verification endpoint
app.get('/webhook/facebook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode && token) {
    if (mode === 'subscribe' && token === CONFIG.VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).set('Content-Type', 'text/plain').send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Message handler endpoint
app.post('/webhook/facebook', (req, res) => {
  const body = req.body;
  
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      
      const senderPsid = webhookEvent.sender.id;
      
      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });
    
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Handle incoming message
function handleMessage(senderPsid, receivedMessage) {
  let response;
  
  if (receivedMessage.text) {
    const messageText = receivedMessage.text;
    const quickReplyPayload = receivedMessage.quick_reply?.payload;
    
    // Use chatbot flow
    const result = chatbot.handleMessage(senderPsid, messageText, quickReplyPayload);
    response = result;
  } else if (receivedMessage.attachments) {
    response = {
      text: 'Зураг хүлээн авлаа! Бараа хайх бол текстээр илгээнэ үү. 😊'
    };
  }
  
  callSendAPI(senderPsid, response);
}

// Handle postback (button clicks)
function handlePostback(senderPsid, receivedPostback) {
  let response;
  const payload = receivedPostback.payload;
  
  if (payload === 'GET_STARTED') {
    response = chatbot.getWelcomeMessage();
  } else if (payload === 'BONUS_CARD') {
    response = chatbot.getBonusCardResponse();
  } else {
    response = chatbot.handleMessage(senderPsid, '', payload);
  }
  
  callSendAPI(senderPsid, response);
}

// Send message via Messenger API
function callSendAPI(senderPsid, response) {
  const requestBody = {
    recipient: { id: senderPsid },
    message: response
  };
  
  fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${CONFIG.PAGE_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  })
  .then(res => res.json())
  .then(json => {
    if (json.error) {
      console.error('Unable to send message:', json.error);
    } else {
      console.log('Message sent!');
    }
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ucombini-chatbot' });
});

// Start server
app.listen(CONFIG.PORT, () => {
  console.log(`UCOMBINI Chatbot server running on port ${CONFIG.PORT}`);
});
