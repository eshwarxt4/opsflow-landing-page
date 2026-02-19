# OpsFlow — Daily Operations Management

OpsFlow is a multi-outlet daily operations management platform. It helps business owners and managers run daily tasks, checklists, and inspections across all their outlets from a single calm dashboard — without chasing people on WhatsApp.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix primitives)
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: TanStack React Query

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Project Structure

```
src/
├── components/          # UI components
│   ├── ui/              # shadcn/ui base components
│   ├── simulation/      # Live simulation views
│   ├── Header.tsx        # Navigation header
│   ├── HeroSection.tsx   # Hero with live dashboard preview
│   ├── BeforeAfterSection.tsx  # Before/After comparison
│   ├── ProblemSection.tsx      # Problem statement
│   ├── ModuleSelector.tsx      # Industry module picker
│   ├── AhaMomentCTA.tsx        # Call-to-action section
│   ├── EarlyAccessForm.tsx     # Early access signup
│   ├── Chatbot.tsx             # AI chatbot widget
│   └── Footer.tsx              # Footer
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── main.tsx             # App entry point
```
