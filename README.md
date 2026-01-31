```
Trent-Lava-Challenge/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main homepage component
│   │   └── page.module.css     # Page-specific styles
│   ├── components/
│   │   ├── icons/              # SVG icon components
│   │   │   ├── StarIcon.tsx
│   │   │   ├── HeartIcon.tsx
│   │   │   ├── CartIcon.tsx
│   │   │   ├── UserIcon.tsx
│   │   │   └── SocialIcons.tsx
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Button.module.css
│   │   ├── ProductCard.tsx     # Product card component
│   │   ├── ProductCard.module.css
│   │   ├── NavLink.tsx         # Navigation link component
│   │   ├── NavLink.module.css
│   │   ├── Logo.tsx            # Logo component
│   │   └── Logo.module.css
│   └── styles/
│       ├── tokens.css          # Design tokens (CSS variables)
│       └── globals.css         # Global styles and font imports
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## How to Run
click this link: https://trent-lava-challenge.vercel.app/

or do all this
### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build

4. Build for production:
```bash
npm run build
```

5. Start production server:
```bash
npm start
```
