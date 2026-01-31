# Trent Lava Challenge - Shoe Store

A pixel-perfect implementation of a shoe store e-commerce website design from Figma, built with Next.js 14+ (App Router), TypeScript, and plain CSS.

## Project Structure

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

## Features

- **Pixel-perfect design** matching Figma specifications
- **TypeScript** for type safety
- **Plain CSS** (no Tailwind, no CSS-in-JS)
- **Design tokens** extracted from Figma values
- **Accessible** semantic HTML with proper ARIA labels
- **Responsive** layout with mobile-first approach
- **Component-based** architecture for reusability

## Design Tokens

All design values (colors, spacing, typography, shadows, etc.) are extracted from Figma and stored as CSS variables in `src/styles/tokens.css`:

- Colors: Primary dark (#4a4c6c), Secondary green (#77794e), Accent red (#db4444), etc.
- Typography: Cabinet Grotesk, Teko, Space Grotesk, Poppins
- Spacing: Consistent spacing scale from Figma
- Shadows: Button and product card shadows
- Border radius: 4px for cards, 100px for buttons

## How to Run

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

## Project Details

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Plain CSS with CSS Modules
- **Fonts**: Google Fonts (Cabinet Grotesk, Teko, Space Grotesk, Poppins)
- **Images**: Remote images from Figma API (valid for 7 days)

## Sections

1. **Announcement Bar**: Top banner with promotional code
2. **Header**: Logo, navigation links, and action icons (wishlist, cart, user)
3. **Hero Section**: Large product image with text overlays
4. **Products Section**: Two rows of product cards with filters
5. **Services Section**: Three service features (delivery, customer service, money back)
6. **Footer**: Company info, contact details, and social links

## Accessibility

- Semantic HTML elements (header, nav, section, footer, article)
- Proper heading hierarchy
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus states for interactive elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile, tablet, and desktop

## Notes

- Image assets are loaded from Figma's API and will expire after 7 days. For production, download and host images locally.
- All spacing, colors, and typography values match the Figma design exactly.
- The design is implemented pixel-perfect based on node-id 1-96 from the Figma file.
