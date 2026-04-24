# Kantan Phase 2A - Deployment Guide

## You're Here: Phase 2A - API Integration

Your landing page is live. Now we're adding the working backend.

---

## ⚡ Quick Start (On Your Machine)

### Step 1: Download the Project

1. Download the `kantan-nextjs` folder I created
2. Open Terminal/Command Prompt
3. Navigate to the folder:
   ```bash
   cd path/to/kantan-nextjs
   ```

### Step 2: Install Node Packages

```bash
npm install
```

This will take ~2 minutes. You'll see a progress bar.

### Step 3: Add Your API Key Locally

1. In the `kantan-nextjs` folder, find `.env.local.example`
2. Copy it and rename the copy to `.env.local`
3. Open `.env.local` in a text editor
4. Replace `your_api_key_here` with your actual Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-real-key-here
   ```
5. Save the file

### Step 4: Test Locally

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

You should see the demo page. Try generating a story!

---

## 🚀 Deploy to Vercel (Make It Live)

### Option A: Replace Your Current Site

**This will replace your current static landing page with the Next.js version.**

1. **Backup first** (optional):
   - Your current repo has `index.html`
   - Make a copy of it somewhere safe
   - Or create a new branch: `git checkout -b backup-v1`

2. **Initialize Git in the Next.js folder**:
   ```bash
   cd kantan-nextjs
   git init
   git add .
   git commit -m "Phase 2A: Next.js + Claude API"
   ```

3. **Push to your existing repo** (this overwrites):
   ```bash
   git remote add origin https://github.com/vorod13/kantan.git
   git branch -M main
   git push -f origin main
   ```

4. **Vercel will auto-deploy** (it's watching your repo)

5. **Add your API key to Vercel**:
   - Go to [vercel.com](https://vercel.com/dashboard)
   - Find your `kantan` project
   - Click "Settings" → "Environment Variables"
   - Add:
     - **Key**: `ANTHROPIC_API_KEY`
     - **Value**: `sk-ant-api03-your-real-key`
     - **Environments**: Check all three (Production, Preview, Development)
   - Click "Save"
   
6. **Redeploy**:
   - Go to "Deployments" tab
   - Click the three dots (•••) on the latest deployment
   - Click "Redeploy"

7. **Test**:
   - Go to `https://thekantancompany.com`
   - Fill in the form
   - Click "Generate Story"
   - Should work in 3-5 seconds!

### Option B: Deploy to a Test URL First

**Safer option: test on a separate Vercel project first**

1. Create a new Vercel project:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Click "Import Third-Party Git Repository"
   - Or create a new GitHub repo for testing

2. Upload the `kantan-nextjs` folder to the new repo

3. Deploy from Vercel (same steps as above)

4. Test at the Vercel URL: `https://kantan-test-xyz.vercel.app`

5. Once it works, switch your main domain over

---

## 🧪 Testing Checklist

After deployment, test:

- [ ] Landing page still loads at `/index.html`
- [ ] Demo page loads at `/` (root)
- [ ] Can fill in all three input fields
- [ ] "Generate Story" button works
- [ ] Story + AC + RICE score appear in ~3-5 seconds
- [ ] Rate limit counter shows "X of 5 remaining"
- [ ] After 5 generations, shows rate limit error

---

## 📊 Monitoring

### Check API Usage

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click "Usage" in sidebar
3. You'll see:
   - API calls per day
   - Token usage
   - Cost per day

### Expected Costs (Phase 2A)

- **Per story**: ~$0.016 (1.6 cents)
- **5 stories/day max** = ~$0.08/day per IP
- **100 IPs/day** = ~$8/day worst case
- **Reality**: You'll get <10 tests/day initially = <$0.20/day

Your $20 in credits = ~1,200 story generations.

---

## ⚠️ Important Security Notes

1. **Never commit `.env.local`** to Git
   - It's already in `.gitignore`
   - Contains your API key
   
2. **Never share your API key**
   - Treat it like a password
   - If leaked, revoke it at console.anthropic.com

3. **Monitor your usage**
   - Check console.anthropic.com weekly
   - Set up billing alerts if available

---

## 🐛 Troubleshooting

### "Module not found" errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### API returns errors

1. Check Vercel environment variables are set
2. Check API key is valid at console.anthropic.com
3. Check you have credits remaining

### Rate limiting not working

- It's in-memory (resets on Vercel restart)
- This is fine for Phase 2A
- We'll add Redis/database in Phase 2B

### Fonts not loading

- Check Google Fonts link in `app/layout.tsx`
- Check browser console for errors

---

## 📞 Next Steps

Once this is deployed and working:

1. **Share the demo** with a few people
2. **Monitor usage** for a week
3. **Collect feedback** 
4. **When you have 20+ waitlist signups** → let's build Phase 2B:
   - Auth (Supabase)
   - Payments (Stripe)
   - Unlimited stories (Solo tier)

---

## Files You Need

Make sure you have these from the kantan-nextjs folder:

```
kantan-nextjs/
├── app/               (all files)
├── public/
│   └── index.html     (your landing page)
├── package.json
├── next.config.js
├── tsconfig.json
├── .env.local.example
├── .gitignore
└── README.md
```

---

## Questions?

Ping me in chat if you hit any issues. I'll help debug!
