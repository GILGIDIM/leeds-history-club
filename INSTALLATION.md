# 🚀 Installation & Deployment Guide

## What's New? ✨

Your app now has:
- ✅ **Real Supabase Authentication** - Tom & Tabitha can login
- ✅ **Database Integration** - Visits stored in PostgreSQL
- ✅ **Image Upload to Cloud** - Photos stored in Supabase Storage
- ✅ **Shared Office Progress** - Everyone sees the same collection
- ✅ **Public Viewing** - Anyone can browse without logging in

## 📦 Step 1: Install Dependencies

In your project directory:

```bash
npm install
```

This will install the new `@supabase/supabase-js` dependency.

## 🧪 Step 2: Test Locally

```bash
npm start
```

The app will open at `http://localhost:3000`

### Test the Features:

1. **Browse as Public User** ✅
   - View all plaques
   - See progress tracker
   - Search and filter
   - Click plaques for details

2. **Login as Admin** 🔐
   - Click "Admin Login"
   - Use Tom or Tabitha's credentials
   - You should see "Welcome, [name]!"

3. **Upload a Photo** 📸
   - While logged in, click an unvisited plaque
   - Click upload area
   - Select an image
   - Add optional notes
   - Click "Mark as Visited"

4. **Verify It Works** ✅
   - Plaque should now show as visited (colored, with checkmark)
   - Progress bar should update
   - Image should display in modal
   - Refresh page - data should persist!

## 🌐 Step 3: Deploy to Vercel

### Option A: Push to GitHub (Recommended)

```bash
git add .
git commit -m "Add Supabase authentication and storage"
git push origin main
```

Vercel will automatically detect the changes and redeploy!

### Option B: Manual Deploy

If you haven't connected GitHub yet:

1. In Vercel dashboard, click your project
2. Go to "Settings" → "Git"
3. Connect your GitHub repository
4. Or use Vercel CLI: `vercel --prod`

## 🔒 Important: Supabase Keys are Public-Safe

The keys in your code are the **public anon keys** - they're designed to be exposed in frontend code. They're rate-limited and respect your Row Level Security policies, so they're safe!

## 🎯 Testing Checklist

Before going live, test:

- [ ] Can browse plaques without logging in
- [ ] Can search and filter
- [ ] Login works for both Tom and Tabitha
- [ ] Can upload photos when logged in
- [ ] Photos appear immediately after upload
- [ ] Progress bar updates correctly
- [ ] Can't upload when not logged in
- [ ] Data persists after page refresh
- [ ] Works on mobile devices

## 🐛 Troubleshooting

### "Module not found: @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### "Invalid login credentials"
- Check email/password are correct
- Verify users exist in Supabase → Authentication → Users

### Images not uploading
1. Check Supabase → Storage → plaque-images bucket exists
2. Verify bucket is PUBLIC
3. Check storage policies are in place

### Visits not showing up
1. Go to Supabase → Table Editor → visits
2. Check if data is being inserted
3. Verify RLS policies are correct

### Build fails on Vercel
- Check the error log
- Most common: missing files or syntax errors
- Run `npm run build` locally to test

## 📊 View Your Data

You can view all visits in Supabase:

1. Go to Supabase Dashboard
2. Click "Table Editor" in left sidebar
3. Click "visits" table
4. See all uploaded visits with photos!

## 🎨 Customization Ideas

Want to add more features? Here are some ideas:

- **Email notifications** when someone uploads a photo
- **Comments** on each visit
- **Map view** showing all plaques
- **Route planner** for visiting multiple plaques
- **Statistics** page with charts
- **Export** visited plaques to PDF

## 🙋 Need Help?

If something isn't working:
1. Check browser console for errors (F12)
2. Check Supabase logs
3. Try the troubleshooting steps above

---

**Enjoy tracking Leeds' history together! 🔵**
