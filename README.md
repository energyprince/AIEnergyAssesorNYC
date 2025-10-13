# AI Energy Assessment Form

An AI-powered energy assessment application built with React for building energy data collection and analysis.

## Features

- Interactive form for comprehensive building energy data collection
- File upload functionality for technical documents (electrical drawings, HVAC schedules, etc.)
- Matrix-style animated background
- Generator and DER (Distributed Energy Resources) system configuration
- Demand response tracking
- Responsive design with modern cyan/blue theme

## Tech Stack

- React 18.2.0
- Parcel bundler
- Vanilla CSS (inline styles)

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm start
```

The application will be available at `http://localhost:1234` (or another port if 1234 is in use).

## Build

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure the build settings:
   - **Build Command**: `parcel build index.html`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

Alternatively, use the Vercel CLI:

```bash
vercel --prod
```

## Project Structure

```
.
├── energyassesmenthtml.jsx  # Main React component
├── index.html                # HTML entry point
├── index.js                  # React render file
├── package.json              # Dependencies
├── vercel.json              # Vercel configuration
└── README.md                # This file
```

## License

MIT
