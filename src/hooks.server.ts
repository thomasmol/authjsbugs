import { SvelteKitAuth } from '@auth/sveltekit';
import { type Handle, } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import Github from '@auth/sveltekit/providers/github';


const svelteKitAuth = SvelteKitAuth({
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return crypto.randomUUID();
    }
  },
  callbacks: {
    session: async ({ session, user }) => {
      if(session.user){
        session.user.id = user.id;
      }
      return session;
    }
  },
  providers: [
    Github({
      clientId: 'PRIVATE_GITHUB_CLIENT_ID',
      clientSecret: 'PRIVATE_GITHUB_CLIENT_SECRET'
    })
  ]
});


export const handle = sequence(svelteKitAuth) satisfies Handle;
