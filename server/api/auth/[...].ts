// file: ~/server/api/auth/[...].ts
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NuxtAuthHandler } from "#auth";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: runtimeConfig.public.GOOGLE_CLIENT_ID,
      clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/adsensehost https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics",
        },
      },
    }),
     // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    FacebookProvider.default({
      clientId: runtimeConfig.public.FACEBOOK_CLIENT_ID,
      clientSecret: runtimeConfig.FACEBOOK_CLIENT_SECRET,
    }),
  ],
});
  