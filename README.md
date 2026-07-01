# figurinha-copa

Turn your kid into a custom World Cup sticker card. A 4-step wizard collects the player's
name, photo, birthday, and country, then generates a collectible sticker card.

## Stack

- [Vite](https://vite.dev) + React
- [Tailwind CSS v4](https://tailwindcss.com)
- Vercel serverless functions (`/api`): Stripe checkout + OpenAI (`gpt-image-1`) sticker generation

## Development

```bash
npm install
npm run dev       # frontend only, http://localhost:5173 — the /api routes will 404 here
npm run dev:full  # frontend + /api routes together via `vercel dev`, needed to test payment/generation
```

Use `dev:full` whenever you need to click through payment or sticker generation locally.
Requires `.env.local` with `STRIPE_SECRET_KEY` and `OPENAI_API_KEY` set.

```bash
npm run lint   # oxlint
npm run build  # production build
```
