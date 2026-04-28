# UCOMBINI Facebook Chatbot

Qualifying questions flow for Messenger sales.

## Quick Deploy to Render.com

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ucombini-chatbot.git
   git push -u origin main
   ```

2. **Connect to Render:**
   - Go to https://render.com
   - New → Blueprint
   - Connect your GitHub repo
   - Render auto-detects `render.yaml`

3. **Or manual deploy:**
   - https://dashboard.render.com/select-repo?type=web
   - Connect repo
   - Build Command: `npm install`
   - Start Command: `node webhook-server.js`
   - Environment Variables:
     - `FACEBOOK_PAGE_TOKEN`= Your token
     - `FACEBOOK_VERIFY_TOKEN`= ucombini_verify_2026_secure

## Facebook Webhook Setup

1. Developers console → Your App → Messenger → Settings
2. Webhooks → Add Callback URL
3. **Callback URL:** `https://ucombini-chatbot.onrender.com/webhook/facebook`
4. **Verify Token:** `ucombini_verify_2026_secure`
5. Subscribe to events: messages, messaging_postbacks

## Chatbot Features

- Qualifying questions before product recommendation
- Categories: Малгай, Гутал, Хувцас, etc.
- Quick reply buttons
- Bonus card responses

## Files

- `webhook-server.js` - Express server
- `chatbot-flow.js` - Qualifying logic
- `render.yaml` - Render deployment config
