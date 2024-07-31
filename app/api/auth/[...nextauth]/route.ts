import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

// Extend the default session type to include the user id
declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
      } & DefaultSession['user'];
    }
  }

  const options: NextAuthOptions = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: 'read:user user:email',
          },
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.sub!;
        }
        return session;
      },
    },
  };
  
  const handler = NextAuth(options);
  export { handler as GET, handler as POST };