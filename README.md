# Zibook

Zibook is a full-stack bookstore e-commerce app built with React + Vite on the frontend and Express + MongoDB on the backend.

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Media: Cloudinary
- Payments: Stripe

## Project structure

- `client/` – frontend app
- `server/` – backend API

## Local setup

1. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

3. Copy environment files:
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

4. Update the values in both `.env` files with your own database, JWT, and Cloudinary credentials.

5. Start the app:
   ```bash
   # frontend
   cd client
   npm run dev

   # backend
   cd ../server
   npm run server
   ```

## Production build

```bash
cd client
npm run build
```

## GitHub push notes

- Never commit real `.env` files.
- Use the `.env.example` files as templates for local configuration.
- Keep `node_modules`, build output, and virtual environments ignored via the repository `.gitignore`.
