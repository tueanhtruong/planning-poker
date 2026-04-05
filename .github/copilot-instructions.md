# Planning Poker — Copilot Instructions

Real-time planning poker app built with **Next.js 15**, **React 18**, **Chakra UI v3**, **Firebase Realtime Database**, and **TanStack Query v5**.

## Architecture

```
src/
  pages/         # Next.js pages (file-based routing)
  modules/       # Feature modules — business logic + UI colocated
    Room/        # Core gameplay: hooks/, RoomPlayGround/, CreateARoom/
    User/        # User profile
    Config/      # App config (card decks, emojis)
    Navbar/      # Top navigation
    ConfirmLeavingDialog/
  components/    # Shared, presentational-only UI components
    ui/          # Chakra system provider, color mode, toaster
  services/      # Data layer — Firebase wrappers only (no business logic)
    Firebase/
      Sessions/  # sessions.ts — RTDB session CRUD + real-time listener
      Users/     # users.ts — user display names
      Config/    # config.ts — card decks, emojis
  hooks/         # Global utilities (generateUUID, callAllHandler)
  styles/        # Framer Motion animation variants
```

**Data flow:** `pages → modules → hooks (TanStack Query) → services (Firebase RTDB)`

## Build and Dev

```bash
pnpm dev          # start dev server
pnpm build        # production build (runs next-sitemap postbuild)
pnpm start        # serve production build
pnpm clean        # wipe .next, node_modules, dist etc.
```

> `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` are both `true` in `next.config.js` — TypeScript errors won't block the build.

## Conventions

### Path aliases

Use `@/*` for all absolute imports from `src/`:

```ts
import { useVote } from '@/modules/Room/hooks';
```

### Hook pattern

Hooks in `src/modules/*/hooks/` wrap Firebase calls with TanStack Query:

```ts
// Queries — wrap real-time listener
export const useRoomInfo = (id: string) => {
  const { data, refetch } = useQuery({ queryKey: ['room', id], queryFn: ... })
  return { data, refetch }
}

// Mutations — rename `mutate` to a domain verb
export const useVote = () => {
  const { mutate: vote, isPending } = useMutation({ mutationFn: participantVote })
  return { vote, isPending }
}
```

- Return a named object, never a tuple.
- Rename `mutate` → a domain action name (`vote`, `reveal`, `upsert`).

### Firebase (RTDB only — not Firestore)

- All reads/writes are in `src/services/Firebase/`; hooks never import `firebase` directly.
- Real-time subscriptions return an unsubscribe function — always clean up in `useEffect`.
- No auth is implemented; anyone with a room ID can read/write that room.
- `sessions/{id}` is the primary key; `sessions/{id}/participants/{userId}` holds per-user votes.

### Module barrel exports

Every module folder has an `index.ts` re-exporting its public API. Import from the barrel:

```ts
import { RoomPlayGround } from '@/modules/Room'; // ✓
import { RoomPlayGround } from '@/modules/Room/RoomPlayGround/RoomPlayGround'; // ✗
```

### Animations

All Framer Motion variants live in `src/styles/animations.ts` (`pageVariants`, `votingCardVariants`, `cardFlipVariants`, etc.). Reuse these before defining new ones.

### Styling

Chakra UI v3 component props only — no custom CSS files except `src/pages/styles.css`. Use `next-themes` + Chakra's `ColorModeProvider` for dark/light mode.

## Pitfalls

- **Firebase RTDB ≠ Firestore**: No complex queries; read entire node and filter client-side.
- **No SSR for Firebase**: Firebase listeners are client-only. Guard with `useEffect` and check data before rendering — no Suspense.
- **Circular barrel imports**: Keep `services` free of module imports; modules may depend on services but not vice versa.
- **Flying emoji cleanup**: `sessions/{id}/flyingEmojis` entries accumulate — include cleanup when modifying that path.
