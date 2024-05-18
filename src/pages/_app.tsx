import AppContextComponent from "@/components/AppContext";

import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Suspense, lazy, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Anybody } from "next/font/google";
import HeaderComponent from "@/components/Header";
import FooterComponent from "@/components/Footer";
import { useRouter } from "next/router";
import AppContextWithReducer from "@/components/AppContextWithReducer";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AppContextComponent>
          {router.pathname === "/" && <HeaderComponent />}
          <main className="">
            <Component {...pageProps} />
            <Toaster position="top-center" />
          </main>
          {router.pathname === "/" && <FooterComponent />}
        </AppContextComponent>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
