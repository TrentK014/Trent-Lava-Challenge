# Complete File Structure

```
Trent-Lava-Challenge/
├── .gitignore
├── FILE_STRUCTURE.md
├── README.md
├── next.config.js
├── package.json
├── tsconfig.json
└── src/
    ├── app/
    │   ├── layout.tsx              # Root layout with metadata
    │   ├── page.tsx                # Main homepage component
    │   └── page.module.css         # Page-specific styles
    ├── components/
    │   ├── icons/
    │   │   ├── CartIcon.tsx        # Shopping cart icon
    │   │   ├── HeartIcon.tsx       # Wishlist/heart icon
    │   │   ├── SocialIcons.tsx     # Social media icons (Facebook, Instagram, Twitter, LinkedIn, YouTube)
    │   │   ├── StarIcon.tsx        # Star rating icon
    │   │   └── UserIcon.tsx        # User account icon
    │   ├── Button.tsx              # Reusable button component
    │   ├── Button.module.css      # Button styles
    │   ├── Logo.tsx                # Logo component
    │   ├── Logo.module.css        # Logo styles
    │   ├── NavLink.tsx             # Navigation link component
    │   ├── NavLink.module.css     # NavLink styles
    │   ├── ProductCard.tsx        # Product card component
    │   └── ProductCard.module.css # ProductCard styles
    └── styles/
        ├── globals.css             # Global styles and font imports
        └── tokens.css              # Design tokens (CSS variables from Figma)
```

## File Count

- **TypeScript/TSX files**: 13
- **CSS files**: 8
- **Configuration files**: 3
- **Total source files**: 24

## Key Components

1. **Page Components** (`src/app/`)
   - `layout.tsx`: Root layout with metadata
   - `page.tsx`: Main homepage with all sections
   - `page.module.css`: Page-specific styles

2. **Reusable Components** (`src/components/`)
   - `Button.tsx`: Primary and secondary button variants
   - `ProductCard.tsx`: Product display card with image, price, rating
   - `NavLink.tsx`: Navigation link component
   - `Logo.tsx`: Brand logo component

3. **Icon Components** (`src/components/icons/`)
   - All icons are inline SVG components for better performance
   - Accessible with proper ARIA labels

4. **Styles** (`src/styles/`)
   - `tokens.css`: All design tokens from Figma as CSS variables
   - `globals.css`: Global styles, resets, and font imports

## Design Tokens

All design values extracted from Figma node 1-96:
- Colors (primary, secondary, backgrounds, text)
- Typography (fonts, sizes, line heights, letter spacing)
- Spacing (consistent spacing scale)
- Shadows (button and product card shadows)
- Border radius
- Layout dimensions
