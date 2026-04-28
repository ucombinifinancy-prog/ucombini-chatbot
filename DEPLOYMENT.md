# UCOMBINI Facebook Chatbot - Deployment Guide

## ✅ Webhook Server Deployed Successfully!

### 🌐 Public Webhook URL
```
https://ucombini-chatbot-2026.loca.lt/webhook/facebook
```

### 📋 Configuration Details

| Setting | Value |
|---------|-------|
| **Webhook URL** | `https://ucombini-chatbot-2026.loca.lt/webhook/facebook` |
| **Verify Token** | `ucombini_verify_2026_secure` |
| **Health Check** | `https://ucombini-chatbot-2026.loca.lt/health` |

---

## 🔧 Facebook Developer Console Setup

### Step 1: Create Facebook App (if not exists)
1. Go to https://developers.facebook.com/
2. Create New App → Select "Business" type
3. Add "Messenger" product
4. Connect your Facebook Page

### Step 2: Configure Webhook
1. In your Facebook App → Messenger Settings
2. Locate "Webhooks" section → Click "Add Callback URL"
3. **Callback URL**: `https://ucombini-chatbot-2026.loca.lt/webhook/facebook`
4. **Verify Token**: `ucombini_verify_2026_secure`
5. Click "Verify and Save"

### Step 3: Subscribe to Events
After webhook is verified, check these boxes:
- ✅ `messages`
- ✅ `messaging_postbacks`
- ✅ `messaging_optins`

### Step 4: Add Page Access Token
1. Generate Page Access Token in Facebook Developer Console
2. Replace in `webhook-server.js` or set as environment variable:
   ```bash
   export FACEBOOK_PAGE_TOKEN="EAAVjTCjNCTgB..."
   ```

---

## 🧪 Chatbot Flow Testing

The chatbot includes qualifying questions for these products:

| Trigger | Qualifying Questions |
|---------|---------------------|
| "Малгай" | 👔 Хэн (том/хүүхэд) → Нас/Размер → Бюджет |
| "Гутал" | 👔 Хэн → Төрөл (спорт/оффис/гэр) → Бюджет |
| "Хувцас" | 👔 Хэн → Төрөл → Размер → Бюджет |
| "Бонус", "Карт" | Бонус картын мэдээлэл шууд харуулна |

### Quick Reply Options
- **Who**: 👔 Том хүн | 👶 Хүүхэд
- **Budget**: 5-15K | 15-30K | 30-50K | 50K+
- **Size**: S | M | L | XL | XXL

---

## 🚨 Important: About LocalTunnel

**Current deployment uses LocalTunnel** - suitable for testing but has limitations:

- ⚠️ Tunnel expires when server restarts
- ⚠️ May require IP whitelisting confirmation
- ⚠️ Not recommended for production

### For Production: Switch to Render.com

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: ucombini-chatbot
    runtime: node
    plan: free
    buildCommand: npm install
    startCommand: node webhook-server.js
    envVars:
      - key: FACEBOOK_PAGE_TOKEN
        value: EAAVjTCjNCTgBRVwzyJemjpfZC74v8XiJxYxB7ZB9kMetHesRi6YCbAaVNU3ZAEMlw9LZCT2m7TkCvjBHnv8ZAsZAb0KMyoRWZA4D9dlVo5sm4GICJEI4agGdsyu2gQjZAZCeYLeLadKobZBSZCipFpT5sfMyw0y6RckCZCRRL8IGvByZCGHLu754CgHJQynpvyFeadPdICjkVKDmWPVF0pix6izjM7lc2ZBwZDZD
      - key: FACEBOOK_VERIFY_TOKEN
        value: ucombini_verify_2026_secure
```

2. Push code to GitHub
3. Connect repo to Render.com (New Web Service)
4. Set environment variables
5. Deploy

---

## 📝 Files Structure

```
fb-chatbot-setup/
├── webhook-server.js    # Main Express server
├── chatbot-flow.js      # Qualifying questions logic
├── package.json         # Dependencies
├── DEPLOYMENT.md        # This file
└── GUIDE.md             # Original setup guide
```

---

## 🔄 Current Status

| Check | Status |
|-------|--------|
| ✅ Server running on port 3000 | Active |
| ✅ LocalTunnel connected | https://ucombini-chatbot-2026.loca.lt |
| ✅ Health check responding | OK |
| ✅ Webhook verification | Working |
| ✅ Invalid token rejection | Working (403) |
| ⏳ Facebook webhook registration | Pending user action |

---

## 🔍 Testing Commands

```bash
# Health check
curl https://ucombini-chatbot-2026.loca.lt/health

# Verify webhook
curl "https://ucombini-chatbot-2026.loca.lt/webhook/facebook?hub.mode=subscribe&hub.verify_token=ucombini_verify_2026_secure&hub.challenge=TEST123"

# Send test message (simulated)
curl -X POST https://ucombini-chatbot-2026.loca.lt/webhook/facebook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "page",
    "entry": [{
      "messaging": [{
        "sender": {"id": "TEST_USER"},
        "message": {"text": "Малгай"}
      }]
    }]
  }'
```

---

**Deployed**: Tue 2026-04-28 UTC  
**Status**: ✅ Ready for Facebook Webhook Configuration
