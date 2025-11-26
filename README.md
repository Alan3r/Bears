# Elite Pro — Dashboard

Monorepo with client (React Vite) and server (Express + MongoDB)

Quick start

1. Install dependencies
   - cd server && npm install
   - cd client && npm install

2. Create `.env` in `server/` with `MONGO_URI` if using remote DB

3. Seed data (optional):
   - cd server && npm run seed

4. Run server and client
   - cd server && npm run dev
   - cd client && npm run dev

Frontend runs on http://localhost:3000 and proxies `/api` to http://localhost:5000

