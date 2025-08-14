# Smart Expense Management

A modern, responsive personal finance application built with React, Vite, and Tailwind CSS.

## Features

- 📊 **Dashboard Overview**: View your financial summary with KPI cards and interactive charts
- 💸 **Expense Tracking**: Add, edit, delete, and filter your expenses
- 💰 **Income Management**: Track multiple income sources
- 📈 **Visual Analytics**: Charts showing spending trends and category breakdowns
- 🔍 **Advanced Filtering**: Search and filter transactions by date, category, and amount
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **Frontend**: React 19.x, Vite 7.x
- **Routing**: React Router DOM 7.x
- **Styling**: Tailwind CSS 4.x
- **Charts**: Recharts
- **Icons**: React Icons (Feather Icons)
- **Notifications**: React Hot Toast
- **Date Handling**: Moment.js
- **HTTP Client**: Axios
- **Emoji Picker**: emoji-picker-react

## Getting Started

### Prerequisites

- Node.js ≥ 20.19
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend/Smart-expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   └── Dashboard/      # Dashboard pages
├── layouts/            # Layout components
├── context/            # React context providers
├── services/           # API services and utilities
├── utils/              # Helper functions
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## Authentication Setup

Currently, the app uses a mock authentication system for development. To integrate with real Google OAuth:

### Option 1: Firebase Authentication

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Google Authentication in the Firebase console
3. Install Firebase SDK: `npm install firebase`
4. Replace the mock implementation in `src/services/authService.js`

### Option 2: Google Identity Services

1. Get Google OAuth credentials from https://console.developers.google.com
2. Add the Google Identity Services script to your HTML
3. Replace the mock implementation in `src/services/authService.js`

### Option 3: Auth0

1. Create an Auth0 account at https://auth0.com
2. Install Auth0 SDK: `npm install @auth0/auth0-react`
3. Replace the mock implementation with Auth0 integration

## API Integration

The app currently uses mock data from `public/mock/transactions.json`. To connect to a real backend:

1. Update the `baseURL` in `src/services/api.js`
2. Implement proper error handling for your API responses
3. Update the authentication token handling if needed

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Netlify**: Connect your repository and deploy automatically
- **Vercel**: Import your project and deploy with zero configuration
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the build files to an S3 bucket

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.