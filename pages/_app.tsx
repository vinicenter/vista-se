import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import React from 'react'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Vista-se Estilo e Conforto",
  description: "Vista-se Estilo e Conforto - Moda feminina com estilo e conforto",
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Component {...pageProps} />
          </body>
        </html>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}