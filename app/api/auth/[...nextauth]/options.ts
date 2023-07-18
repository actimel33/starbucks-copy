import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@lib/prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        nameOrEmail: { label: 'Name or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: IUserCredetials | undefined) {
        // check to see if password is there

        if (!credentials?.nameOrEmail || !credentials?.password) {
          throw new Error('Please enter an email and password!');
        }

        const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

        const isEmail = regex.test(credentials.nameOrEmail);

        let user: any;
        let users: any[] = [];

        if (isEmail) {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.nameOrEmail,
            },
          });
        } else {
          users = await prisma.user.findMany({
            where: {
              name: credentials.nameOrEmail,
            },
          });
        }

        // if no user was found
        if (!user && !users.length) {
          throw new Error('No user found!');
        }

        // check to see if password matches
        if (users.length) {
          user = users.find(async u => await bcrypt.compare(credentials.password, u.hashedPassword));
        }

        const passswordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!passswordMatch) {
          throw new Error('Wrong Email or Password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      return { ...session, uid: token.uid };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    // maxAge: 60 * 60,
    // updateAge: 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development',
};
