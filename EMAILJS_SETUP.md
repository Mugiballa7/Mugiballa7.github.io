# EmailJS Setup Guide 📧

This guide will help you set up EmailJS to send emails directly from your website to `tallballa50@gmail.com`.

## Step 1: Create EmailJS Account
1. Go to [https://emailjs.com](https://emailjs.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended)
4. Click **"Connect Account"** and sign in with your Gmail
5. Note down your **Service ID** (something like `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to **"Email Templates"** in your dashboard
2. Click **"Create New Template"**
3. Use this template content:

**Subject:**
```
New Contact from Website
```

**Content:**
```
You have a new message from your website!

From: {{from_email}}

Message:
{{message}}

---
Sent from your personal website contact form
```

4. Save the template and note down your **Template ID** (something like `template_xxxxxxx`)

## Step 4: Get Your Public Key
1. Go to **"Account"** in your EmailJS dashboard
2. Find your **Public Key** (something like `xxxxxxxxxxxxxxx`)

## Step 5: Update Your Website Code
Open `script.js` and replace these placeholders:

```javascript
// Replace these three values:
emailjs.init("YOUR_PUBLIC_KEY");          // Your actual public key
emailjs.send("YOUR_SERVICE_ID",           // Your service ID  
            "YOUR_TEMPLATE_ID", {         // Your template ID
```

**Example:**
```javascript
emailjs.init("abc123def456");
emailjs.send("service_gmail123", "template_contact456", {
```

## Step 6: Test Your Form
1. Save your changes
2. Open your website
3. Fill out the contact form
4. Submit it
5. Check your inbox at `tallballa50@gmail.com`

## Troubleshooting
- **Form not working?** Check browser console for errors
- **Not receiving emails?** Check spam folder
- **Rate limits?** EmailJS free plan allows 200 emails/month
- **Need help?** Check [EmailJS documentation](https://docs.emailjs.com/)

## What You Get
✅ **Direct email sending** from your static website  
✅ **No backend required** - perfect for GitHub Pages  
✅ **Real-time feedback** - loading states and success messages  
✅ **Error handling** - user-friendly error messages  
✅ **Form validation** - prevents spam and invalid submissions  

Your contact form will now send emails directly to your inbox! 🚀 