# Navigation Components & Routing Structure

## Overview
This document outlines the navigation components and routing structure for the TradesBuilder website builder application. The app uses Next.js 13+ with App Router and includes both public and protected routes.

## App Structure

### Root Level Routes
```
├── / (Landing page)
├── /auth/google/callback (OAuth callback)
└── /AIWebsiteBuilders/ (Main application routes)
```

### Main Application Routes (`/AIWebsiteBuilders/`)

#### Authentication Routes (`/auth/`)
- `/AIWebsiteBuilders/auth/login` - User login page
- `/AIWebsiteBuilders/auth/register` - User registration page
- `/AIWebsiteBuilders/auth/forgot-password` - Password reset request
- `/AIWebsiteBuilders/auth/verify-otp` - OTP verification page
- `/AIWebsiteBuilders/auth/onboarding` - New user onboarding flow

#### Main Application Routes
- `/AIWebsiteBuilders/home` - Dashboard/Home page (Protected)
- `/AIWebsiteBuilders/template-selector` - Template selection interface (Protected)
- `/AIWebsiteBuilders/portfolio/[username]` - Public portfolio display
- `/AIWebsiteBuilders/profile` - User profile view
- `/AIWebsiteBuilders/profile/edit` - Edit user profile (Protected)
- `/AIWebsiteBuilders/pricing` - Pricing page
- `/AIWebsiteBuilders/oauth-redirect` - OAuth redirect handler

## Navigation Components

### 1. Landing Page Navbar (`/app/components/landing/Navbar.tsx`)
**Purpose**: Main navigation for the public landing page
**Features**:
- Responsive design with mobile hamburger menu
- Smooth scrolling to page sections
- Login/Register CTAs
- Material-UI AppBar implementation

**Key Props**:
```tsx
type NavbarProps = {
  sections: { id: string; label: string; ref: React.RefObject<HTMLElement> }[];
};
```

**Navigation Actions**:
- Smooth scroll to landing page sections
- Redirect to `/AIWebsiteBuilders/auth/login` for login
- Redirect to authenticated home if user is logged in

### 2. Dashboard Navigation (`/app/components/dashboard/Dashboard.tsx`)
**Purpose**: Main navigation for authenticated users
**Features**:
- Drawer-based sidebar navigation
- Responsive design that collapses on mobile
- User profile display with avatar
- Logout functionality

**Menu Items**:
```tsx
const menuItems = [
  { text: "Templates", icon: <Layout size={20} />, id: "templates" },
  { text: "Drafts", icon: <DraftingCompass size={20} />, id: "drafts" },
  { text: "Profile", icon: <User size={20} />, id: "profile" },
];
```

**Navigation Actions**:
- Template selection view
- Draft management
- Profile management
- Logout with session cleanup

### 3. UI Navigation Menu (`/app/components/ui/navigation-menu.tsx`)
**Purpose**: Reusable navigation component built on Radix UI
**Features**:
- Dropdown navigation support
- Keyboard navigation
- Animation support
- Customizable styling with Tailwind CSS

**Components**:
- `NavigationMenu` - Root container
- `NavigationMenuList` - Menu items container
- `NavigationMenuItem` - Individual menu item
- `NavigationMenuTrigger` - Dropdown trigger
- `NavigationMenuContent` - Dropdown content
- `NavigationMenuLink` - Navigation links
- `NavigationMenuViewport` - Animated viewport
- `NavigationMenuIndicator` - Active state indicator

## Route Protection

### Protected Routes
The following routes require authentication:
```tsx
const protectedRoutes = [
  "/AIWebsiteBuilders/home",
  "/AIWebsiteBuilders/editor",
  "/AIWebsiteBuilders/profile/edit",
  "/AIWebsiteBuilders/template-selector",
];
```

### Route Protection Implementation (`/app/protectRoute.tsx`)
**Features**:
- Automatic redirect to login for unauthenticated users
- Token-based authentication check
- Client-side route protection
- Preserves intended destination after login

**Usage**:
```tsx
export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  // Checks localStorage for token
  // Redirects to login if no token and route is protected
  return <>{children}</>;
};
```

## Routing Patterns

### Navigation Methods Used

#### 1. Next.js Router (`useRouter`)
```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
// Programmatic navigation
router.push("/AIWebsiteBuilders/home");
router.replace("/AIWebsiteBuilders/auth/login");
```

#### 2. Next.js Link Component
```tsx
import Link from "next/link";

<Link href="/AIWebsiteBuilders/auth/login">
  Login
</Link>
```

#### 3. Direct Window Location (for external URLs)
```tsx
window.location.href = `${window.location.origin}/AIWebsiteBuilders/template-selector?sessionId=${sessionId}`;
```

### Common Navigation Patterns

#### Authentication Flow
1. Landing page → Login/Register
2. Successful auth → Home dashboard
3. Onboarding for new users
4. Route protection redirects to login

#### User Journey
```
Landing → Auth → Onboarding → Dashboard → Template Selection → Editor → Portfolio
```

#### Error Handling
- Invalid sessions redirect to login
- Missing users redirect to registration
- API errors show appropriate feedback

## Key Navigation Features

### 1. Responsive Design
- Mobile-first approach
- Collapsible sidebars
- Touch-friendly navigation

### 2. State Management
- Redux for global auth state
- Local storage for session persistence
- Real-time route protection

### 3. User Experience
- Smooth animations and transitions
- Loading states during navigation
- Breadcrumb navigation in some flows

### 4. SEO Considerations
- Proper meta tags for each route
- JSON-LD structured data
- Robot directives for auth pages

## Development Guidelines

### Adding New Routes
1. Create page component in appropriate `/app/` directory
2. Add to protected routes if authentication required
3. Update navigation menus if needed
4. Add proper metadata and SEO tags

### Navigation Best Practices
- Use `useRouter` for programmatic navigation
- Use `Link` component for declarative navigation
- Implement loading states for async operations
- Clean up sessions on logout
- Validate authentication before protected route access

### Testing Navigation
- Test route protection on protected routes
- Verify proper redirects after authentication
- Test responsive navigation on mobile devices
- Validate deep linking functionality

## Files Reference

### Navigation Components
- `/app/components/landing/Navbar.tsx` - Landing page navigation
- `/app/components/dashboard/Dashboard.tsx` - Main app navigation
- `/app/components/ui/navigation-menu.tsx` - Reusable navigation primitives

### Route Configuration
- `/app/protectRoute.tsx` - Route protection logic
- `/app/layout.tsx` - Root layout and metadata

### Page Components
- Authentication pages in `/app/AIWebsiteBuilders/auth/`
- Main application pages in `/app/AIWebsiteBuilders/`

This navigation structure provides a comprehensive routing system that supports both public and authenticated user experiences while maintaining security and usability standards.
