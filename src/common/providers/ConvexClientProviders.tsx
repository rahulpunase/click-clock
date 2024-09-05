import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient } from "convex/react";
import { ConvexError } from "convex/values";
import { PropsWithChildren } from "react";

import { toast } from "@/design-system/ui/Toast/useToast";

const client = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const convexQueryClient = new ConvexQueryClient(client);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
      // @ts-expect-error
      throwOnError: (error, query) => {
        if (error instanceof ConvexError) {
          toast({
            title: "Query error occurred",
            description: `${error.data.message} | Code: ${error.data.code} | ${query.queryHash}`,
            variant: "destructive",
          });
        }
      },
    },
    mutations: {
      onError(error) {
        if (error instanceof ConvexError) {
          toast({
            title: "Query error occurred",
            description: `${error.data.message} | Code: ${error.data.code}`,
            variant: "destructive",
          });
        }
      },
    },
  },
});

convexQueryClient.connect(queryClient);

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    <ConvexAuthProvider client={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexAuthProvider>
  );
}
