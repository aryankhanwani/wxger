import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from './db';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  email: string;
  username: string | null;
  name: string | null;
  image: string | null;
  password_hash: string | null;
}

const providers = [];

// Only add Google provider if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthConfig = {
  providers: [
    ...providers,
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error('Please enter your email/username and password');
        }

        try {
          // Try to find user by email or username
          const result = await sql`
            SELECT * FROM users 
            WHERE email = ${credentials.identifier} 
            OR username = ${credentials.identifier}
            LIMIT 1
          ` as User[];

          if (!result || result.length === 0 || !result[0]?.password_hash) {
            throw new Error('Invalid email/username or password');
          }

          const user = result[0];
          if (!user.password_hash) {
            throw new Error('Invalid email/username or password');
          }
          const passwordHash = user.password_hash as string;
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            passwordHash
          );

          if (!isValidPassword) {
            throw new Error('Invalid email/username or password');
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name || user.username || undefined,
            username: user.username || undefined,
            image: user.image || undefined,
          };
        } catch (error: any) {
          console.error('Authorization error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account?: any; profile?: any }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUserResult = await sql`
            SELECT * FROM users WHERE email = ${user.email} LIMIT 1
          ` as User[];

          let userId: number;

          if (existingUserResult && existingUserResult.length > 0) {
            const existingUser = existingUserResult[0];
            userId = existingUser.id;
            // Update user if needed
            await sql`
              UPDATE users 
              SET name = ${user.name}, 
                  image = ${profile?.picture || user.image},
                  updated_at = CURRENT_TIMESTAMP
              WHERE email = ${user.email}
            `;
          } else {
            // Create new user with username from email
            const usernameFromEmail = user.email?.split('@')[0] || 'user';
            let username = usernameFromEmail;
            let counter = 1;

            // Ensure username is unique
            while (true) {
              const existing = await sql`
                SELECT id FROM users WHERE username = ${username} LIMIT 1
              ` as User[];
              if (!existing || existing.length === 0) break;
              username = `${usernameFromEmail}${counter}`;
              counter++;
            }

            const newUserResult = await sql`
              INSERT INTO users (email, name, image, username, email_verified)
              VALUES (${user.email}, ${user.name}, ${profile?.picture || user.image}, ${username}, CURRENT_TIMESTAMP)
              RETURNING id
            ` as { id: number }[];

            userId = newUserResult[0].id;
            user.id = userId.toString();
          }

          // Save account info
          await sql`
            INSERT INTO accounts (
              user_id, type, provider, provider_account_id, 
              access_token, expires_at, token_type, scope, id_token
            )
            VALUES (
              ${userId}, 
              ${account.type}, 
              ${account.provider}, 
              ${account.providerAccountId},
              ${account.access_token || null},
              ${account.expires_at || null},
              ${account.token_type || null},
              ${account.scope || null},
              ${account.id_token || null}
            )
            ON CONFLICT (provider, provider_account_id) 
            DO UPDATE SET
              access_token = EXCLUDED.access_token,
              expires_at = EXCLUDED.expires_at,
              token_type = EXCLUDED.token_type,
              scope = EXCLUDED.scope,
              id_token = EXCLUDED.id_token
          `;
        } catch (error) {
          console.error('Error in Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

