# Deployment Checklist ✅

Use this checklist to ensure everything is set up correctly!

## Pre-Deployment (Local Setup)

- [ ] Node.js installed (v14+)
- [ ] Git installed
- [ ] Project downloaded and extracted
- [ ] `npm install` completed successfully
- [ ] `npm start` works and app loads at localhost:3000
- [ ] Tested search functionality
- [ ] Tested filter buttons (All, Visited, Unvisited)
- [ ] Tested clicking plaque cards (modal opens)
- [ ] Checked responsive design (resize browser window)

## GitHub Setup

- [ ] GitHub account created
- [ ] Git initialized in project (`git init`)
- [ ] All files added (`git add .`)
- [ ] Initial commit created (`git commit -m "Initial commit"`)
- [ ] GitHub repository created (leeds-history-club)
- [ ] Remote added (`git remote add origin ...`)
- [ ] Code pushed to GitHub (`git push origin main`)
- [ ] Verified all files appear on GitHub.com

## Vercel Deployment

- [ ] Vercel account created
- [ ] Connected Vercel to GitHub account
- [ ] Imported leeds-history-club repository
- [ ] Verified build settings:
  - Framework: Create React App
  - Build Command: npm run build
  - Output Directory: build
- [ ] Clicked "Deploy"
- [ ] Deployment successful (no errors)
- [ ] Visited Vercel URL and app works
- [ ] Tested all features on Vercel URL

## Custom Domain (Optional)

- [ ] Added domain in Vercel Settings → Domains
- [ ] Entered: historyclub.gilgidim.dev
- [ ] Added CNAME record to DNS provider:
  - Type: CNAME
  - Name: historyclub
  - Value: cname.vercel-dns.com
- [ ] Waited for DNS propagation (5-30 minutes)
- [ ] Verified domain works in browser
- [ ] SSL certificate issued (https:// works)
- [ ] Tested on multiple devices/browsers

## Post-Deployment Testing

- [ ] Tested on desktop browser
- [ ] Tested on mobile phone
- [ ] Tested on tablet
- [ ] Checked Chrome browser
- [ ] Checked Firefox browser
- [ ] Checked Safari browser (if available)
- [ ] Search functionality works
- [ ] Filter buttons work
- [ ] Plaque modals open and close
- [ ] Progress bar displays correctly
- [ ] All 200 plaques display
- [ ] CSS loads correctly (no styling issues)
- [ ] Images/icons load (if any)

## Optional Enhancements

- [ ] Customized colors in App.css
- [ ] Updated meta tags in index.html
- [ ] Added favicon/logo
- [ ] Set up Google Analytics (if desired)
- [ ] Added social media meta tags
- [ ] Tested sharing links on social media

## Future Development (Phase 2)

- [ ] Planned Supabase authentication
- [ ] Designed image upload flow
- [ ] Researched map integration (Leaflet/Mapbox)
- [ ] Created user stories for Phase 2
- [ ] Set timeline for next features

---

## Troubleshooting Common Issues

### Local Development
**Problem**: npm install fails
- Clear cache: `npm cache clean --force`
- Delete node_modules and try again

**Problem**: Port 3000 in use
- Kill process: `lsof -ti:3000 | xargs kill`
- Or use different port: `PORT=3001 npm start`

### GitHub
**Problem**: Git push rejected
- Pull first: `git pull origin main --rebase`
- Then push: `git push origin main`

### Vercel
**Problem**: Build fails
- Check build logs in Vercel dashboard
- Ensure all files are pushed to GitHub
- Check that package.json is correct

**Problem**: App loads but looks broken
- Check browser console for errors
- Verify CSS import path in App.js
- Clear browser cache and reload

### Domain
**Problem**: Custom domain not working
- Wait 30 minutes for DNS propagation
- Use incognito/private browsing
- Check DNS with: `nslookup historyclub.gilgidim.dev`
- Verify CNAME record in DNS provider

---

## Success Criteria

Your deployment is successful when:
✅ App is live and accessible at your URL
✅ All 200 plaques display correctly
✅ Search and filters work properly
✅ Modals open with full plaque details
✅ Design is responsive on all devices
✅ No console errors in browser
✅ SSL certificate is active (https://)
✅ Performance is good (loads quickly)

---

🎉 Once all boxes are checked, you're ready to share your Leeds History Club with the world!

Share your link: https://historyclub.gilgidim.dev
