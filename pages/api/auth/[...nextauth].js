import NextAuth from "next-auth";

import GoogleProvidor from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvidor({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({session,token}){
      session.user.tag=session.user.name.split(" ").join("").toLocaleLowerCase();
      session.user.uid=token.sub;
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
