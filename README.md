# Findcation

> Bản đồ kết nối staycation self-checkin khắp Việt Nam

A modern web platform connecting travelers with self-check-in staycations across Vietnam. Built with React, featuring interactive maps, real-time listings, and a comprehensive host management system.

## 🌟 Features

- **Interactive Map**: Browse staycations on an interactive map powered by MapLibre GL
- **User Authentication**: Secure login/register with Google OAuth integration
- **Host Dashboard**: Manage your staycation listings, view analytics, and track traffic
- **Admin Panel**: Administrative tools for managing listings and user suggestions
- **Listing Creation**: Step-by-step wizard for creating new staycation listings
- **Image Upload**: Support for multiple images including HEIC format conversion
- **PWA Support**: Install as a progressive web app on mobile devices
- **Analytics**: Integrated with Vercel Analytics and Microsoft Clarity

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A backend API server (see Environment Variables)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd find-staycation

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Backend API URL
VITE_BACKEND_URL=https://api.findcation.vn

# Google OAuth Client ID
VITE_OAUTH_CLIENT_ID=your-google-oauth-client-id
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint

# Bundle Analysis
ANALYZE=true npm run build  # Build and open bundle visualizer
```

## 🏗️ Project Structure

```
src/
├── admin/              # Admin dashboard components
├── auth/               # Authentication (login, register, password reset)
├── components/         # Shared components (ErrorBoundary)
├── config/             # Configuration (API client)
├── host/               # Host dashboard and listing management
├── listing/            # Staycation listing creation wizard
├── map/                # Map view and staycation preview
├── utils/              # Utilities (logger, error handler, image processor)
├── app.jsx             # Main app component and routing
└── main.jsx            # Application entry point
```

## 🛠️ Tech Stack

### Core
- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Vite 6** - Build tool and dev server

### UI & Animation
- **Framer Motion** - Animations
- **CSS Modules** - Scoped styling
- **Lucide React** - Icon library

### Maps
- **MapLibre GL** - Interactive maps
- **React Leaflet** - Map components
- **MapTiler SDK** - Map tiles and geocoding

### State & Data
- **React Context** - State management
- **Axios** - HTTP client

### Authentication
- **Google OAuth** - Social login

### Media
- **html2canvas** - Screenshot generation
- **heic2any** - HEIC image conversion

### Development
- **ESLint** - Code linting
- **Rollup Plugin Visualizer** - Bundle analysis

## 🔐 Authentication Flow

1. User visits `/auth/login` or `/auth/register`
2. Can login with email/password or Google OAuth
3. Session stored in HTTP-only cookies
4. Protected routes check authentication status via `AuthContext`

## 📱 PWA Features

The app is a Progressive Web App with:
- Offline support
- Install to home screen
- Service worker for caching
- Responsive design for mobile and desktop

## 🗺️ Map Integration

The map uses MapLibre GL with:
- Custom markers for staycations
- Popup previews on marker click
- Geocoding for address search
- User location detection

## 📊 Analytics

Integrated analytics:
- **Vercel Analytics** - Page views and performance
- **Microsoft Clarity** - Heatmaps and session recordings
- **Custom Traffic Tracking** - Staycation view and contact click tracking

## 🧪 Development Guidelines

### Code Quality
- Use the centralized `logger` utility instead of `console.log`
- All API calls should use the `apiClient` from `config/api.js`
- Add PropTypes to all components receiving props
- Handle errors with `handleApiError` utility

### State Management
- Use React Context for global state
- Keep component state local when possible
- Loading states should follow the pattern: `{ data, loading, error }`

### Styling
- Use CSS Modules for component styles
- Follow mobile-first responsive design
- Use CSS variables for theming

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Deploy dist/ to any static hosting service
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

- Ensure `.env` file is in the root directory
- Variable names must start with `VITE_`
- Restart dev server after changing `.env`

### Map Not Loading

- Check `VITE_BACKEND_URL` is correct
- Verify backend API is running
- Check browser console for CORS errors

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email [your-email] or open an issue in the repository.

---

Made with ❤️ for travelers in Vietnam
