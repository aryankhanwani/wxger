# Authentication Setup Guide

This guide will help you set up authentication for the Wxger application.

## Prerequisites

1. A Neon Database account (https://neon.tech)
2. A Google Cloud Console account for OAuth

## Step 1: Set up Neon Database

1. Create a new project in Neon
2. Copy your database connection string (it should look like: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`)
3. Add it to your `.env.local` file as `DATABASE_URL`

## Step 2: Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret

## Step 3: Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## Step 4: Create Environment Variables

Create a `.env.local` file in the `frontend` directory with the following:

```env
# Database
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Step 5: Initialize Database

After setting up your environment variables, initialize the database by visiting:

```
http://localhost:3000/api/init-db
```

Or run the development server and the database will be initialized automatically on first use.

## Step 6: Test Authentication

1. Start your development server: `npm run dev`
2. Try signing up with email/password
3. Try logging in with email or username
4. Try signing in with Google

## Features

- ✅ Email/Password authentication
- ✅ Username/Password authentication (users can login with either email or username)
- ✅ Google OAuth authentication
- ✅ User registration with username
- ✅ Secure password hashing with bcrypt
- ✅ Session management with NextAuth.js
- ✅ Database schema with proper indexes

## Database Schema

The following tables are created:

- `users` - Stores user information (id, username, email, password_hash, etc.)
- `accounts` - Stores OAuth provider accounts
- `sessions` - Stores user sessions
- `verification_tokens` - Stores email verification tokens

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure your Neon database is accessible
- Check that SSL mode is set to `require`

### Google OAuth Issues

- Verify redirect URIs match exactly
- Check that Client ID and Secret are correct
- Ensure Google+ API is enabled

### NextAuth Issues

- Verify `NEXTAUTH_SECRET` is set
- Check that `NEXTAUTH_URL` matches your application URL
- Ensure all environment variables are in `.env.local` (not `.env`)

