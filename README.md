# Vehiql - AI-Powered Car Marketplace

A modern car marketplace platform built with Next.js, Supabase, and Clerk authentication. Vehiql allows users to browse, search, and book test drives for vehicles with an integrated EMI calculator and AI-powered search functionality.

## Features

- 🚗 Browse and search cars with advanced filters
- 🔍 AI-powered car search using Google Gemini
- 📅 Book test drives with dealerships
- 💰 EMI calculator with real-time calculations
- ❤️ Save favorite cars
- 🔐 Secure authentication with Clerk
- 📊 Admin dashboard for managing cars and test drives
- 🎨 Modern, responsive UI with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Supabase Storage
- **Authentication**: Clerk
- **AI**: Google Gemini API
- **Security**: Arcjet

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key_here"
GEMINI_MODEL="gemini-2.0-flash-exp"

# Arcjet Security
ARCJET_KEY="your_arcjet_key_here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/engrhassanr/vehiql-nextjs-supabase.git
cd vehiql
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your API keys and credentials.

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
```

5. **Set up Supabase Storage**

Run the SQL script in Supabase SQL Editor:

- Script location: `scripts/fix-supabase-storage.sql`
- See `SETUP_COMPLETE.md` for detailed instructions

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Storage Structure

**Super simple:** One bucket, one folder!

```
car-images/
└── cars/
    ├── {car-id}/          ← Car listing images (in subfolders)
    │   └── image-*.webp
    └── ai-search-*.jpeg   ← AI search images (root level with prefix)
```

- **Car listings:** `cars/{car-id}/image-*.webp` (organized by car ID)
- **AI search:** `cars/ai-search-*.jpeg` (temporary, prefix for easy cleanup)

Run `npm run cleanup:search-images` to delete old AI search images (7+ days).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
