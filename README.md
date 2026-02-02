# Leeds History Club

Track your visits to all 200 Leeds Civic Trust blue plaques with this interactive web application.

## 🏛️ Features

- **200 Blue Plaques**: Complete catalog of all Leeds Civic Trust blue plaques
- **Visual Progress Tracker**: See your completion percentage at a glance
- **Photo Upload**: Capture and upload photos of your visits
- **Smart Filtering**: Filter by visited/unvisited status
- **Search Functionality**: Find plaques by title or location
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Heritage-Inspired UI**: Distinctive design that honors Leeds' history

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/leeds-history-club.git
cd leeds-history-club
```

2. **Install dependencies**
```bash
npm install
```

3. **Add the plaques data**
   - Place the `plaques.json` file in `src/data/`

4. **Start the development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
leeds-history-club/
├── src/
│   ├── components/
│   │   ├── PlaqueGrid.js
│   │   ├── PlaqueGrid.css
│   │   ├── PlaqueCard.js
│   │   ├── PlaqueCard.css
│   │   ├── PlaqueModal.js
│   │   ├── PlaqueModal.css
│   │   ├── ProgressTracker.js
│   │   ├── ProgressTracker.css
│   │   ├── LoginForm.js
│   │   └── LoginForm.css
│   ├── data/
│   │   └── plaques.json
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
├── package.json
└── README.md
```

## 🎨 Design Philosophy

The design features a heritage-inspired aesthetic with:
- **Playfair Display** for headings (elegant serif)
- **Source Serif 4** for body text (readable serif)
- Heritage color palette: Leeds blue, gold accents, cream backgrounds
- Visual distinction between visited (full color) and unvisited (greyed out) plaques

## 🔧 Next Steps: Adding Backend

Currently, the app uses local state. To persist data:

### Option 1: Supabase (Recommended)

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Set up tables:
   - `users` (for authentication)
   - `visits` (plaque_id, user_id, image_url, visit_date)
4. Install Supabase client:
```bash
npm install @supabase/supabase-js
```
5. Configure environment variables:
```bash
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### Option 2: Firebase

1. Create a Firebase project
2. Enable Authentication and Storage
3. Install Firebase:
```bash
npm install firebase
```

## 🌐 Deployment to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Create React App settings

3. **Configure Custom Domain**
   - In Vercel project settings, go to Domains
   - Add `historyclub.gilgidim.dev`
   - Add CNAME record to your DNS:
     - Type: CNAME
     - Name: historyclub
     - Value: cname.vercel-dns.com

## 📱 Features to Add

- [ ] Map view of all plaques
- [ ] Route planner for visiting multiple plaques
- [ ] Social sharing of achievements
- [ ] Leaderboard of most visited
- [ ] Historical information for each plaque
- [ ] Comments/notes for each visit
- [ ] Export visited plaques list

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Leeds Civic Trust for maintaining the blue plaque program
- All the sponsors and unveilers who made these plaques possible

---

**Happy plaque hunting! 🔵**
