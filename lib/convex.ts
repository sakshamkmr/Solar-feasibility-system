import { ConvexAuthProvider, ConvexProviderWithClerk } from "convex/react-clerk";
import { clerkClient } from "@/lib/clerkClient";

export const convexAuth = {
  getToken: async () => {
    const token = await clerkClient.auth.getToken();
    return token ?? "";
  },
};
