import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { PropsWithChildren } from "react";

const client = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}
