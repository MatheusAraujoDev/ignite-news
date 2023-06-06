import { query as q } from 'faunadb'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { fauna } from '../../../services/fauna'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // ...add more providers here
  ],
  // jwt: {
  //   signingKey: process.env.JWT_SIGNIN_KEY as string,
  // },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      const { email } = user

      try {
        await fauna.query(
          // q.Create(q.Collection('users'), { data: { email } }),
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email)),
              ),
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email))),
          ),
        )

        return true
      } catch (error) {
        return false
      }
    },
  },
}
export default NextAuth(authOptions)
