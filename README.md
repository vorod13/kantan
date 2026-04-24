# Kantan - Phase 2A: API Integration

This is the Next.js version of Kantan with Claude API integration for story generation.

## What's in This Build

✅ Claude API integration (generates user stories with AC + RICE scoring)  
✅ IP-based rate limiting (5 stories per day for free tier)  
✅ Working demo page at `/` (root)  
✅ Your original landing page preserved at `/index.html`  

## Local Development Setup

### 1. Install Dependencies

```bash
cd kantan-nextjs
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` and add your API key:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
```

**IMPORTANT**: Never commit `.env.local` to git. It's already in `.gitignore`.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo page.

Your original landing page is available at [http://localhost:3000/index.html](http://localhost:3000/index.html)

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
# In your kantan-nextjs directory
git init
git add .
git commit -m "Phase 2A: Next.js + Claude API integration"
git branch -M main
git remote add origin https://github.com/vorod13/kantan.git
git push -u origin main
```

**Note**: This will overwrite your current repo. Your landing page HTML is preserved in `/public/index.html`.

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your `vorod13/kantan` repository
4. Vercel will auto-detect it's a Next.js project

### Step 3: Add Environment Variable

**CRITICAL**: Before deploying, add your API key to Vercel:

1. In the Vercel deployment screen, scroll to "Environment Variables"
2. Add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: `sk-ant-your-actual-api-key-here` (paste your real key)
   - **Environment**: Select all (Production, Preview, Development)
3. Click "Add"

### Step 4: Deploy

Click "Deploy" and wait ~2 minutes.

Your demo page will be at: `https://thekantancompany.com/`  
Your original landing page will be at: `https://thekantancompany.com/index.html`

## Testing the API

Once deployed, test it:

1. Go to your site
2. Fill in the three input fields:
   - User Type: "power user"
   - What: "export data to CSV"
   - Why: "I can analyze trends offline"
3. Click "Generate Story"
4. You should see a generated user story, acceptance criteria, and RICE score in ~3-5 seconds

## Rate Limiting

- Free tier: 5 stories per IP per day
- Counter shows "X of 5 free stories remaining today"
- Resets every 24 hours
- In Phase 2B, we'll add auth and upgrade to Solo tier

## Cost Per Generation

Each story generation costs approximately:
- Input: ~500 tokens @ $3/1M = $0.0015
- Output: ~1000 tokens @ $15/1M = $0.015
- **Total: ~$0.0165 per story** (about 1.6 cents)

At 5 stories/day max (free tier), worst case is $0.08/day per IP.

## What's Next (Phase 2B)

When you have 20+ waitlist signups:
- [ ] Add Supabase Auth
- [ ] Add Stripe integration
- [ ] Unlock Solo tier ($19/month)
- [ ] Add smart copy formatters (Notion/Trello/GitHub/Linear)
- [ ] Usage dashboard

## Troubleshooting

**"Failed to generate story"**
→ Check that `ANTHROPIC_API_KEY` is set in Vercel environment variables

**Rate limit errors**
→ Each IP gets 5 stories per day. Wait 24 hours or test from a different IP.

**Styles look broken**
→ Make sure fonts are loading (check browser console)

## Files Structure

```
kantan-nextjs/
├── app/
│   ├── api/
│   │   └── generate-story/
│   │       └── route.ts        # Claude API integration
│   ├── layout.tsx              # Root layout with fonts + meta
│   ├── page.tsx                # Demo page (main UI)
│   └── globals.css             # Design system (Kantan colors)
├── public/
│   └── index.html              # Your original landing page
├── package.json
├── next.config.js
├── tsconfig.json
├── .env.local.example
└── .gitignore
```

## Important Notes

1. **Your original landing page is safe** — it's in `/public/index.html`
2. **Never commit `.env.local`** — it contains your API key
3. **API keys cost money** — monitor usage at console.anthropic.com
4. **Rate limiting is in-memory** — resets if Vercel restarts (acceptable for Phase 2A)

## Support

Issues? Check:
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
