# UCOMBINI FB Chatbot - Webhook Info

## 🌐 Public Webhook URL

```
https://ucombini-chatbot.loca.lt/webhook/facebook
```

## 🔐 Verify Token

```
ucombini_verify_2026_secure
```

## 📋 Facebook Developers Setup Steps

### 1. Webhook тохируулах
1. https://developers.facebook.com/apps танай App рүү орно
2. Messenger → Settings
3. "Webhooks" хэсэгт "Add Callback URL" дээр дарна
4. **Callback URL:** `https://ucombini-chatbot.loca.lt/webhook/facebook`
5. **Verify Token:** `ucombini_verify_2026_secure`
6. "Verify and Save" дээр дарна

### 2. Events сонго
✅ **messages** - Ирсэн мессеж хүлээн авах
✅ **messaging_postbacks** - Button дарах
✅ **messaging_optins** - Get Started

### 3. Page Subscribe
Webhook доорх "Add Subscription" дээр дарж, UCOMBINI page сонго.

## 🧪 Турших

Facebook Page-ийн Messenger рүү хандана:
```
Н: "Малгай үзье"
Бот: "Та яг ямар малгай хайж байна? 🧢" (👔Том 👶Хүүхэд)
```

## ⚠️ Анхааруулга

Loca.lt tunnel хязгаарлагдмал хугацаанд ажиллана (~2 цаг). Тогтмол ажиллахын тулд:

**Байнгын шийдэл:**
- Railway.app (үнийн сул) тээр deploy хийх
- Render.com үйлчилгээ ашиглах
- here.now (OpenClaw)

## 📞 Support

Webhook ажиллахгүй бол:
1. `https://ucombini-chatbot.loca.lt/health` шалга
2. Server log шалга: `tail -f server.log`
3. Facebook webhook error logs шалга

---
*Generated: 2026-04-28*
