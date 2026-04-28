# UCOMBINI Facebook Chatbot Setup Guide

## Бүрэн Facebook Messenger API Integration

---

## Алхам 1: Facebook Developer Account үүсгэх (15 минут)

### 1.1. Бүртгэл үүсгэх
```
https://developers.facebook.com/apps/create/
```

### 1.2. App үүсгэх
- **App Type:** Other → Business
- **App Name:** UCOMBINI Chatbot
- **App Contact Email:** ucombini@gmail.com

### 1.3. Products нэмэх
1. Dashboard → "Add Product"
2. **Messenger** сонго

### 1.4. Facebook Page холбох
```
Settings → Messenger → Access Tokens
→ "Add or Remove Pages"
→ UCOMBINI page сонго
→ "Generate Token"
```

**📝 Page Access Token хуулж аваад надад явуул:**
```
EAAxxxxx... (urtaar ni)
```

---

## Алхам 2: App Review болон Permissions (Optional - хожим)

### 2.1. App Mode: Development → Live
Production-д орохын тулд:
```
Settings → Basic → App Mode: Live
```

### 2.2. Permissions
- `pages_messaging` - Message илгээх
- `pages_read_engagement` - Page унших

---

## Алхам 3: Webhook тохируулах (Хамгийн чухал)

### 3.1. Verify Token
```
ucombini_verify_2026_secure
```

### 3.2. Callback URL
```
https://clawd.yourdomain.com/webhook/facebook
```
(Эсвэл https://maton.ai/webhook/fb-chatbot-ucombini)

### 3.3. Webhook Events сонго
```
✅ messages
✅ messaging_postbacks
✅ messaging_optins
```

---

## Алхам 4: here.now Publish (Alternative)

Хэрэв өөрийн server байхгүй бол here.now ашиглах:

```bash
# Webhook handler publish
openclaw here-now publish ./fb-chatbot-webhook/
```

---

## Token-г хаана хадгалах

```bash
# OpenClaw config хадгалах
openclaw config set FACEBOOK_PAGE_TOKEN "EAA..."
openclaw config set FACEBOOK_VERIFY_TOKEN "ucombini_verify_2026_secure"
openclaw config set FACEBOOK_PAGE_ID "your-page-id"
```

---

## ⚠️ Бүтэн эрх авахын тулд:

1. **Business Verification** (Meta Business Suite)
   - Business documents upload
   - Domain verification

2. **App Review**
   - `pages_messaging` permission review хүсэлт

---

*Step-by-step болгоныг дэлгэрэнгүй хийж өгье*
