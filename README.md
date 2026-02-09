# 💎 Metals Dashboard

A modern, real-time precious metals price tracking dashboard with dual currency support (USD and INR), built with React, Node.js, and Tailwind CSS.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📌 About This Project

The **Metals Dashboard** is a full-stack web application that provides real-time tracking of precious metal prices. It scrapes live price data from Kitco, a reputable source for commodity prices, and displays the information in an interactive, user-friendly interface.

The application features:
- **Real-time updates** every 30 seconds
- **Dual currency support** (USD per ounce and INR per gram)
- **Interactive 3D flip animations** for currency switching
- **Search and filtering** capabilities
- **Automated web scraping** with caching for optimal performance
- **Live exchange rate integration** for accurate currency conversion

---

## 🌟 Features

### Core Features
- **Real-Time Price Tracking**: Live precious metals prices updated every 30 seconds
- **Multi-Currency Support**: View prices in both USD (per ounce) and INR (per gram)
- **Interactive Flip Cards**: Click-to-flip 3D card animations to switch between currencies
- **Search Functionality**: Filter metals by name in real-time
- **Live Data Sources**: Automatic web scraping from Kitco
- **Exchange Rate Integration**: Live USD to INR conversion using exchangerate-api
- **Source Status Monitoring**: Real-time display of data source health

### Supported Metals
- 🥇 Gold
- 🥈 Silver
- Platinum
- Palladium
- Rhodium

### UX/UI Highlights
- **Modern Card Design**: Beautiful gradient backgrounds with metal-specific colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark Theme Header**: Professional navigation with live status indicators
- **Smooth Animations**: 3D flip effects and pulse animations
- **Accessibility**: Semantic HTML and keyboard navigation support

---

- **Cors** - Cross-origin requests
- **dotenv** - Environment configuration
- **Nodemon** - Auto-reload during development

### APIs & Services
- **Kitco** - Precious metals prices (https://www.kitco.com/price/precious-metals)
- **ExchangeRate API** - USD to INR conversion (https://api.exchangerate-api.com/v4/latest/USD)

---

## 🌐 Data Sources

This project scrapes live data from the following external sources:

### 1. Kitco Precious Metals Prices
- **Website**: [https://www.kitco.com/price/precious-metals](https://www.kitco.com/price/precious-metals)
- **Description**: Real-time precious metals spot prices
- **Metals Available**: Gold, Silver, Platinum, Palladium, Rhodium
- **Unit**: Per troy ounce (oz)
- **Update Frequency**: Every 60 seconds (configurable)
- **Technology**: Web scraping with Cheerio HTML parser

### 2. ExchangeRate API
- **Website**: [https://api.exchangerate-api.com/v4/latest/USD](https://api.exchangerate-api.com/v4/latest/USD)
- **Description**: Live currency exchange rates
- **Currency Pair**: USD to INR (Indian Rupee)
- **Fallback Rate**: 83 INR = 1 USD (if API is unavailable)
- **Update Frequency**: On demand with caching
- **Type**: RESTful API (GET request)

---

## 📋 Prerequisites & Pre-Installation

### System Requirements
- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher (comes with Node.js)
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: ~500MB for dependencies
- **Internet Connection**: Required for web scraping and API calls

### Install Node.js
- **Windows**: Download from [nodejs.org](https://nodejs.org/) and run the installer
- **macOS**: 
  ```bash
  brew install node
  ```
- **Linux**:
  ```bash
  sudo apt-get install nodejs npm
  ```

### Verify Installation
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

---

## 📁 Project Structure

```
metals-dashboard/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Header.jsx      # Dashboard header with status
│   │   │   ├── SearchBar.jsx   # Search input component
│   │   │   ├── MetalsTable.jsx # Metals grid container
│   │   │   ├── MetalFlipCard.jsx # Flip card component
│   │   │   └── Loading.jsx     # Loading spinner
│   │   ├── pages/
│   │   │   └── Dashboard.jsx   # Main dashboard page
│   │   ├── api/
│   │   │   └── metals.api.js   # API client functions
│   │   ├── assets/             # Images and static files
│   │   ├── App.jsx             # Main React application
│   │   ├── main.jsx            # Entry point
│   │   ├── index.css           # Global styles
│   │   └── App.css             # Application styles
│   ├── public/                 # Static public assets
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── package.json            # Dependencies and scripts
│   └── README.md
│
├── backend/                    # Node.js Express backend API
│   ├── src/
│   │   ├── app.js              # Express app setup and middleware
│   │   ├── server.js           # Server entry point and startup
│   │   ├── routes/
│   │   │   └── metals.routes.js # API endpoints for metals data
│   │   ├── scrapers/
│   │   │   ├── index.js        # Scraper module exports
│   │   │   └── kitco.scraper.js # Web scraper for Kitco prices
│   │   └── services/
│   │       ├── cache.service.js # In-memory caching service
│   │       └── metals.service.js # Business logic and scraper job
│   ├── .env                    # Environment variables (not in repo)
│   ├── package.json            # Dependencies and scripts
│   └── README.md
│
└── README.md                   # Project documentation (this file)
```

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/Mayank8881/Metal-Scraping.git
cd metals-dashboard
```

### Step 2: Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

#### Create Environment File
Create a file named `.env` in the `backend` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Scraping Configuration
SCRAPE_INTERVAL_SECONDS=60
```

**Note**: The `.env` file should never be committed to version control. Add it to `.gitignore`.

### Step 3: Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Optional: Create Environment File
Create a file named `.env` in the `frontend` directory (optional):
```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Run Commands

### Backend

#### Development Mode (with auto-reload)
```bash
cd backend
npm run dev
```
- Server runs on: `http://localhost:5000`
- Nodemon automatically restarts on file changes
- Perfect for development and debugging

#### Production Mode
```bash
cd backend
npm start
```
- Server runs on: `http://localhost:5000`
- No auto-reload, suitable for deployment

#### Health Check
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"ok","message":"Backend is running fine 🚀"}`

### Frontend

#### Development Mode
```bash
cd frontend
npm run dev
```
- App runs on: `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- View app in browser at the given URL

#### Build for Production
```bash
cd frontend
npm run build
```
- Creates optimized build in `dist/` folder
- Minified CSS, JS, and assets
- Ready for deployment

#### Preview Production Build
```bash
cd frontend
npm run preview
```
- Serves the built app locally
- Helps verify production build before deployment

#### Lint Code
```bash
cd frontend
npm run lint
```
- Checks code for quality issues
- Uses ESLint configuration

### Running Full Application

#### Quick Start (Both Services)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and visit: `http://localhost:5173`

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/health
```

### 1. Get All Metals Data
```
GET /api/metals
-- http://localhost:5000/api/metals
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "metal": "Gold",
      "priceUSD": 2034.22,
      "priceUSDAltUnit": 65.38,
      "priceINR": 168846,
      "priceINRAltUnit": 5426.54,
      "currency": "USD/INR",
      "unitUSD": "oz",
      "unitINR": "gram",
      "source": "Kitco",
      "lastUpdated": "2026-02-08T12:54:48.000Z"
    },
    {
      "metal": "Silver",
      "priceUSD": 29.45,
      "priceUSDAltUnit": 0.947,
      "priceINR": 2444,
      "priceINRAltUnit": 78.63,
      "currency": "USD/INR",
      "unitUSD": "oz",
      "unitINR": "gram",
      "source": "Kitco",
      "lastUpdated": "2026-02-08T12:54:48.000Z"
    }
  ],
  "lastUpdated": "2026-02-08T12:54:48.000Z",
  "sourceStatus": {
    "Kitco": true
  }
}
```

### 2. Search Metals
```
GET /api/metals?search=gold
```

**Query Parameters:**
- `search` (optional): Filter metals by name (case-insensitive)

**Response:** Same as above but filtered

### 3. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running fine 🚀"
}
```

---

## ⚙️ Configuration

### Backend Configuration (`.env`)
```env
# Server Configuration
PORT=5000                      # Port for backend server
NODE_ENV=development           # Environment (development/production)

# Scraping Configuration
SCRAPE_INTERVAL_SECONDS=60    # How often to update prices (in seconds)
```

### Frontend Configuration
The frontend is primarily configured in configuration files:
- `vite.config.js` - Build and dev server settings
- `tailwind.config.js` - Tailwind CSS customization
- `eslint.config.js` - Code quality rules

---

## 🎨 Design System

### Color Palette
- **Primary Theme**: Deep Navy/Indigo (`slate-900` to `indigo-900`)
- **Accent Color**: Amber/Gold (`amber-500`)
- **Metal-Specific Colors**:
  - **Gold**: Amber/Yellow gradient (`from-yellow-400 to-amber-600`)
  - **Silver**: Gray/Slate gradient (`from-gray-300 to-gray-500`)
  - **Platinum**: Blue gradient (`from-blue-300 to-blue-500`)
  - **Palladium**: Cyan gradient (`from-cyan-300 to-blue-400`)
  - **Copper**: Orange gradient (`from-orange-400 to-red-500`)

### Key Components
- **Cards**: 3D flip animation, metal-specific gradients, responsive grid layout
- **Header**: Dark theme with right-aligned status indicators and live updates
- **Search Bar**: Icon-based input with amber focus state and icon
- **Status Badges**: Animated pulse indicators showing source health
- **Loading States**: Spinner component for data fetching

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    METALS DASHBOARD                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  EXTERNAL DATA SOURCES                                       │
│  ├── Kitco Website (prices)                                │
│  └── ExchangeRate API (USD→INR conversion)                 │
│          ↓                                                   │
│  BACKEND (Node.js/Express)                                 │
│  ├── Scrapers/kitco.scraper.js (HTML parsing with Cheerio)│
│  ├── Services/metals.service.js (Business logic)           │
│  ├── Services/cache.service.js (In-memory caching)         │
│  └── Routes/metals.routes.js (API endpoints)               │
│          ↓                                                   │
│  API Endpoints                                             │
│  ├── GET /api/metals (fetch all metals)                   │
│  ├── GET /api/metals?search=... (search)                  │
│  └── GET /health (server status)                           │
│          ↓                                                   │
│  FRONTEND (React)                                          │
│  ├── API Client (axios requests)                           │
│  ├── Components (display data)                             │
│  └── Pages (Dashboard.jsx)                                 │
│          ↓                                                   │
│  USER INTERFACE                                            │
│  ├── Header with status                                    │
│  ├── Search bar                                            │
│  ├── Metal flip cards                                      │
│  └── Price display (USD/INR)                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Update & Refresh Logic

- **Backend Scraping**: Runs every 60 seconds (configurable via `SCRAPE_INTERVAL_SECONDS`)
- **Frontend Polling**: Fetches data every 30 seconds from the API
- **Search**: Debounced with 500ms delay to optimize performance
- **Cache**: In-memory cache prevents unnecessary scraping between intervals
- **Auto-Update Indicator**: Header shows "Last Updated" timestamp

---

## 🐛 Troubleshooting

### Issue: Port 5000 Already in Use
```bash
# On Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change PORT in .env file
PORT=5001
```

### Issue: Scraper Not Fetching Data
```
Symptoms: Prices show N/A or old data
Solutions:
  • Check internet connection
  • Verify Kitco website is accessible in browser
  • Check backend console for error messages
  • Reduce SCRAPE_INTERVAL_SECONDS and restart
  • Verify Cheerio selectors haven't changed (Kitco may update)
```

### Issue: Frontend Cannot Connect to Backend
```
Symptoms: "Cannot connect to server" in frontend
Solutions:
  • Ensure backend is running (http://localhost:5000/health)
  • Check if port 5000 is correct in frontend code
  • Verify CORS is enabled in backend/src/app.js
  • Check browser console for network errors
  • Try disabling browser cache (DevTools → Network → Disable cache)
```

### Issue: npm install Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Exchange Rate API Not Working
```
Symptoms: Price conversion rates stuck at default
Symptoms: Falls back to 83 INR = 1 USD
Solutions:
  • Check internet connection
  • API might be rate-limited
  • Check API website status
```

---

## 📈 Performance Tips

- **Caching**: Backend caches prices to reduce API calls, only scrapes every 60 seconds
- **Debouncing**: Search input debounced to 500ms to reduce re-renders
- **Lazy Loading**: Metal cards load on-demand in responsive grid
- **Production Build**: Frontend builds to ~238KB minified (optimized)
- **Code Splitting**: Vite automatically splits code for faster loading

---

## 🔐 Security Best Practices

- **No .env Commits**: Never commit `.env` files with sensitive data to repository
- **Input Validation**: Search queries are sanitized to prevent injection attacks
- **API Proxying**: Frontend requests go through backend to prevent CORS issues
- **User-Agent Headers**: Added to scraper requests to identify as legitimate browser
- **CORS Configuration**: Currently allows all origins (change in production)

---

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository on GitHub
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and test them
4. **Commit** with clear messages:
   ```bash
   git commit -m "Add: description of your feature"
   ```
5. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open** a Pull Request on GitHub

---

## 📞 Support & Contact

For questions, issues, or suggestions:
- 🐛 [Open an Issue](https://github.com/Mayank8881/Metal-Scraping/issues) on GitHub
- 💬 Check [existing issues](https://github.com/Mayank8881/Metal-Scraping/issues) for solutions
- 📋 Review console logs for detailed error messages
- 📚 Check this README for common issues

---

## 🚀 Future Enhancements

Planned features for future releases:

- [ ] **Historical Price Charts** - Interactive charts using Chart.js or Recharts
- [ ] **Multiple Data Sources** - Add Investing.com, MoneyControl, etc.
- [ ] **Price Alerts** - Notify when prices cross thresholds
- [ ] **User Accounts** - Save preferences and watchlists
- [ ] **Mobile App** - React Native mobile application
- [ ] **Dark/Light Theme** - Toggle theme preference
- [ ] **Price Comparison** - Compare prices between different sources
- [ ] **CSV Export** - Download historical data as CSV
- [ ] **WebSocket** - Real-time updates without polling
- [ ] **Advanced Filters** - Sort by price change, volatility, etc.
- [ ] **Cryptocurrency** - Add crypto prices alongside precious metals
- [ ] **Email Notifications** - Subscribe to price change alerts

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cheerio Documentation](https://cheerio.js.org/)

---

**Last Updated**: February 2026  
**Maintained by**: Mayank  
**Repository**: [Metal-Scraping](https://github.com/Mayank8881/Metal-Scraping)

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Express.js](https://expressjs.com)
- [Cheerio Documentation](https://cheerio.js.org)

---

**Built with ❤️ for precious metals traders and investors**

Last Updated: February 8, 2026 | Version: 1.0.0
