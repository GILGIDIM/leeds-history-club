# Leeds History Club - Complete Setup Guide

This guide will walk you through setting up, deploying, and customizing your Leeds History Club application.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [GitHub Setup](#github-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Custom Domain Configuration](#custom-domain-configuration)
6. [Testing Your App](#testing-your-app)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, make sure you have:

- [ ] **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] **GitHub account** - [Sign up here](https://github.com/)
- [ ] **Vercel account** - [Sign up here](https://vercel.com/)
- [ ] **Text editor** (VS Code, Sublime, etc.)

### Verify Installation

Open your terminal and run:
```bash
node --version  # Should show v14 or higher
npm --version   # Should show 6.x or higher
git --version   # Should show 2.x or higher
```

---

## Local Development Setup

### Step 1: Navigate to Your Project

```bash
cd leeds-history-club
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install React and all necessary packages. It may take 2-3 minutes.

### Step 3: Start Development Server

```bash
npm start
```

Your app should automatically open at `http://localhost:3000`. If not, manually open this URL in your browser.

### Step 4: Verify Everything Works

You should see:
- ✅ "Leeds History Club" header
- ✅ Progress tracker showing "0 / 200 plaques visited"
- ✅ Search bar
- ✅ Filter buttons (All, Visited, Unvisited)
- ✅ Grid of plaque cards

Try clicking on a plaque card - a modal should open with full details!

---

## GitHub Setup

### Step 1: Initialize Git Repository

```bash
# Make sure you're in the project directory
cd leeds-history-club

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Leeds History Club app"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top-right → **New repository**
3. Fill in:
   - **Repository name**: `leeds-history-club`
   - **Description**: "Track Leeds Civic Trust blue plaques"
   - **Visibility**: Public (or Private, your choice)
   - **Do NOT** check "Initialize with README" (we already have files)
4. Click **Create repository**

### Step 3: Connect Local to GitHub

Copy the commands GitHub shows you, or run:

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/leeds-history-club.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify on GitHub

Refresh your GitHub repository page. You should see all your files uploaded!

---

## Vercel Deployment

### Step 1: Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** or **Login**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Click **Add New...** → **Project**
2. Find your `leeds-history-club` repository in the list
3. Click **Import**

### Step 3: Configure Project Settings

Vercel should auto-detect these settings:
- **Framework Preset**: Create React App ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `build` ✅
- **Install Command**: `npm install` ✅

If anything looks wrong, you can manually set these values.

### Step 4: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for the build to complete
3. You'll see "🎉 Congratulations!" when done

### Step 5: Get Your Deployment URL

Vercel will give you a URL like:
```
https://leeds-history-club-abc123.vercel.app
```

Click **Visit** to see your live site! 🚀

---

## Custom Domain Configuration

### Option A: Using Vercel's Default Domain

Your app is already live at `https://leeds-history-club-xyz.vercel.app`

### Option B: Using Your Custom Domain (historyclub.gilgidim.dev)

#### Step 1: Add Domain in Vercel

1. In your Vercel project dashboard, click **Settings**
2. Click **Domains** in the left sidebar
3. In the input box, type: `historyclub.gilgidim.dev`
4. Click **Add**

Vercel will show you DNS configuration instructions.

#### Step 2: Configure DNS

**You need to add a CNAME record in your DNS provider** (wherever gilgidim.dev is registered - could be Namecheap, GoDaddy, Cloudflare, etc.)

1. Log in to your DNS provider
2. Find DNS settings for `gilgidim.dev`
3. Add a new record:
   - **Type**: CNAME
   - **Name**: `historyclub` (or `historyclub.gilgidim.dev`)
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: 3600 (or Auto)
4. Save the record

#### Step 3: Wait for Propagation

- DNS changes take 5-30 minutes to propagate
- You can check status at [dnschecker.org](https://dnschecker.org/)
- Enter: `historyclub.gilgidim.dev`

#### Step 4: SSL Certificate

Once DNS propagates, Vercel automatically provisions an SSL certificate (https://). This may take 5-10 minutes.

You'll see a green checkmark ✅ next to your domain in Vercel when ready!

---

## Testing Your App

### Test Locally

```bash
npm start
```

Then test:
1. **Search functionality**: Type "Louis Le Prince" in search
2. **Filters**: Click "Visited" and "Unvisited" buttons
3. **Card clicks**: Click any plaque to open modal
4. **Modal close**: Click X or outside modal to close
5. **Responsive design**: Resize browser window

### Test Production Build

```bash
npm run build
npm install -g serve
serve -s build
```

Open `http://localhost:3000` to test the production build locally.

### Test on Real Devices

Once deployed to Vercel:
1. Open on your phone
2. Test on tablet
3. Test in different browsers (Chrome, Firefox, Safari)

---

## Troubleshooting

### Problem: "npm: command not found"

**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

### Problem: npm install fails

**Solution**: 
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Port 3000 already in use

**Solution**:
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm start
```

### Problem: Git push rejected

**Solution**:
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push
git push origin main
```

### Problem: Vercel build fails

**Solution**:
1. Check build logs in Vercel dashboard
2. Make sure all files are committed and pushed to GitHub
3. Try deploying again

### Problem: CSS not loading on Vercel

**Solution**: Check that your import in App.js is:
```javascript
import './styles/App.css';
```
Not `./App.css`

### Problem: Domain not working after DNS change

**Solution**:
1. Wait 30 minutes for DNS propagation
2. Clear your browser cache (Cmd+Shift+R or Ctrl+Shift+R)
3. Try in incognito/private browsing mode
4. Check DNS with: `nslookup historyclub.gilgidim.dev`

---

## Next Steps

Once your app is deployed, you can:

1. **Test thoroughly** on different devices
2. **Share with friends** to get feedback
3. **Plan Phase 2**: Authentication and image uploads
4. **Customize** the colors and styling in App.css
5. **Add more features** from the README

---

## Need Help?

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **React Documentation**: [react.dev](https://react.dev)
- **Create React App**: [create-react-app.dev](https://create-react-app.dev)

---

## Quick Reference Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Test production build locally
npm install -g serve
serve -s build

# Git commands
git add .
git commit -m "Your message"
git push origin main

# Check what's changed
git status
git diff
```

---

🎉 **Congratulations!** You've successfully set up and deployed Leeds History Club!
