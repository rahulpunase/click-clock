import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

import { DataModel } from "./_generated/dataModel";
import { _createUserProfile } from "./profile";
import { ResendOTP } from "./resendOTP";
import { _createUserDataAfterSignInOrSignUp } from "./userData";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub, Google, CustomPassword, ResendOTP],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, user) {
      console.log(user);
      await _createUserDataAfterSignInOrSignUp(ctx, user.userId);
      if (user.profile.name) {
        await _createUserProfile(ctx, {
          userId: user.userId,
          name: user.profile?.name as string,
          email: user.profile?.email as string,
        });
      }
    },
  },
  signIn: {
    maxFailedAttempsPerHour: 6,
  },
});
