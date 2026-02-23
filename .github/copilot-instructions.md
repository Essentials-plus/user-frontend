# Copilot Instructions - Essentials Plus User Frontend

## Project Overview

Next.js 14 (Pages Router) meal delivery/food subscription e-commerce platform with TypeScript, React Query, and Tailwind CSS. Supports authenticated users and guest checkout flows.

## Architecture

### Three-Tier API Client System

The app uses **three separate axios clients** based on auth context:

- **`publicApiClient`** (`src/api-clients/public-api-client/`) - No authentication, public product/meal data
- **`guestApiClient`** (`src/api-clients/guest-api-client/`) - Guest checkout flows, manages `guestId` cookie
- **`userApiClient`** (`src/api-clients/user-api-client/`) - Authenticated users, adds `authorization` header from `auth` cookie

**Key pattern**: Choose the right client based on user state. Guest checkout uses `guestApiClient` which auto-manages guest sessions via response interceptor.

### Authentication & Route Protection

Cookie-based auth with middleware protection (`src/middleware.ts`):

- **Auth cookies**: `auth` (token), `user` (JSON user object), `guestId` (guest session)
- **Route types**: `authneticatedRoutes`, `unAuthneticatedRoutes`, `guestRoutes` (defined in `src/config/routes.ts`)
- **UserSessionProvider** (`src/hooks/useUserSession.tsx`) manages login/logout and React Query cache invalidation

```tsx
// Access user session anywhere
const { user, login, logout, guestUserId } = useUserSession();
```

### Data Fetching Pattern

React Query with **centralized queryOptions** pattern:

```tsx
// Define in src/api-clients/*/queries/index.ts
export const getProductsQueryOptions = ({ axiosReqConfig } = {}) => ({
  queryKey: ["get-products", axiosReqConfig || null],
  queryFn: () => publicApiClient.get(...).then(res => res.data),
});

// Use in components
const { data } = useQuery(getProductsQueryOptions({ axiosReqConfig }));
```

**Global config** (`src/pages/_app.tsx`):

- `staleTime: 60s` - avoid immediate refetch on mount
- `retry: 1`
- `refetchOnWindowFocus: false`
- Auto toast error messages for mutations

### Views Architecture

Pages are **thin wrappers** that import from `src/views/`:

```tsx
// src/pages/cart.tsx
import CartView from '@/views/cart';
export default CartView;

// src/views/cart/index.tsx
const CartView = () => {
  /* actual implementation */
};
```

Components specific to a view live in `src/views/[page-name]/components/`. Shared components go in `src/common/components/`.

## Key Conventions

### Path Aliases

- `@/*` → `src/*` (configured in `tsconfig.json`)

### State Management

- **React Query**: Server state, caching, mutations
- **Jotai**: Local UI state atoms (e.g., `isUpdatingCartAtom` in `useCartData`)
- **nuqs**: URL query state (NuqsAdapter in `_app.tsx`)

### Forms & Validation

- **React Hook Form** + **Zod** schemas (defined in `src/lib/schemas.tsx`)
- Use `@hookform/resolvers` zod resolver
- Dutch validation messages (e.g., "Minimaal 1 teken")

### Styling

- **Tailwind CSS** with custom utilities:
  - `cn()` - Tailwind merge for conditional classes (`src/lib/utils.tsx`)
  - `cx()` - clsx for complex conditionals
- Custom fonts via CSS variables: `--open-sans`, `--oswald`, `--montserrat`, `--roboto-serif`

### Custom Layouts

Pages can override default Layout using `getLayout`:

```tsx
OnboardingPage.getLayout = (page) => (
  <OnboardingLayout>{page}</OnboardingLayout>
);
```

### Error Handling

- Global error handler shows toast for mutation errors (`getApiErrorMessage` utility)
- Zod errors formatted as lists in toasts
- Custom toast icons configured in `_app.tsx`

## Project-Specific Patterns

### Cart Management

`useCartData` hook (`src/hooks/useCartData.tsx`) provides:

- Debounced cart updates (1s delay)
- Optimistic UI with `isUpdatingCart` atom
- Auto-refetch after mutations
- Coupon integration via `useAppliedCoupon`

### Constants Organization

Static data centralized in `src/constants/`:

- `routes.ts` - All route paths as functions
- `form-select-data.tsx` - Dropdown options
- `meal-order.ts`, `meal.ts` - Meal-related constants
- Cookie names, query keys exported from `constants/index.tsx`

### Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_USER_API_BASE_URL
NEXT_PUBLIC_PUBLIC_API_BASE_URL
NEXT_PUBLIC_GUEST_API_BASE_URL (implied, add if missing)
NEXT_PUBLIC_CALORIE_PRICE
NEXT_PUBLIC_CURRENCY_TYPE (eur/usd)
NEXT_PUBLIC_SHIPPING_CHARGE
NEXT_PUBLIC_MINIMUM_ORDER_VALUE_FOR_FREE_SHIPPING
```

## Development Workflow

### Commands

```bash
npm run dev   # Dev server on :3000
npm run build # Production build
npm start     # Production server
npm run lint  # ESLint check
```

### Adding New Features

1. **New page**: Create in `src/pages/`, implement in `src/views/[page-name]/`
2. **API calls**: Add queryOptions to appropriate `api-clients/*/queries/` file
3. **Protected route**: Add to route arrays in `src/config/routes.ts`
4. **Shared logic**: Create custom hook in `src/hooks/`

### TypeScript Types

API response types in `src/types/api-responses/`. Use generic `ApiResponseSuccessBase<T>` wrapper.

## Language & Localization

- **Dutch language** used throughout UI strings (Nederlandse)
- Error messages in Dutch: "Minimaal 1 teken", "Uw sessie is verlopen"
- Email: `info@essentialsplus.eu` (from constants)

## Common Gotchas

- Guest checkout requires `guestApiClient`, not `publicApiClient`
- Always check user session before authenticated API calls
- Mutations automatically trigger error toasts - no manual toast.error needed
- Middleware redirects preserve `redirectUri` query param - use `redirectUriQueryKey` constant
- React Query cache cleared on login/logout via `queryClient.resetQueries()`
