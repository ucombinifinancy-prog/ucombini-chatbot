# Render.com Deploy Instructions

## Step 1: Connect GitHub Repo

1. Go to https://dashboard.render.com/blueprint
2. Click **"New Blueprint Instance"**
3. Connect your GitHub account
4. Select repository: **ucombinifinancy-prog/ucombini-chatbot**
5. Click **"Apply"**

Render will auto-detect `render.yaml` and configure everything.

## Step 2: Add Environment Variable

After deployment starts:

1. Go to your service: https://dashboard.render.com/web/ucombini-chatbot
2. Click **"Environment"** tab
3. Add variable:
   - **Key:** `FACEBOOK_PAGE_TOKEN`
   - **Value:** `EAAVjTCjNCTgBRfLoNHqFYbMEtb6rZCTxA3jB9mXZAAgjKeyp9wr6gjm7YiqLX21aNU9f4KsMYyPp4BL1KLRVjw2la4i7EGsdHvAuM38ZBUnKglQYdi7HWNM2rlK7JjBiUmhMMXXoyvU36nDZCZBGPLGUac1UQNZARk9ZC6pNGEvWni9lxgiedrUme5iAkafbAZCjvHM96OaC8i8848jnhRG0FLQ0bgZDZD`
4. Click **"Save Changes"**

## Step 3: Deploy

1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Wait for build to complete (2-3 minutes)

## Step 4: Get Webhook URL

Once deployed:
- Your URL: `https://ucombini-chatbot.onrender.com/webhook/facebook`
- Health check: `https://ucombini-chatbot.onrender.com/health`

## Step 5: Facebook Setup

1. Go to https://developers.facebook.com/apps
2. Your App → Messenger → Settings
3. Webhooks → "Add Callback URL"
4. **Callback URL:** `https://ucombini-chatbot.onrender.com/webhook/facebook`
5. **Verify Token:** `ucombini_verify_2026_secure`
6. Click "Verify and Save"
7. Subscribe to events: ✓ messages, ✓ messaging_postbacks, ✓ messaging_optins

## Done! 🎉

Test in Messenger:
- User: "Малгай үзье"
- Bot: "Та яг ямар малгай хайж байна? 🧢"
