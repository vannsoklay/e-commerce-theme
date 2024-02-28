import "./root.css";

import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";

import AuthProvider from "./contexts/useAuth";
import { CartProvider } from "./contexts/useCart";
import MobileTopBar from "./components/layout/MobileBottom";
import PublicLayout from "./components/layout/Public";
// @refresh reload
import { Suspense } from "solid-js";
import { Toaster } from "solid-toast";
import { read } from "./utils/theme";

export default function Root() {
  const globals = read("globals");
  const header = read("header");
  const banner = read("banner");

  return (
    <Html lang="en" data-theme="mytheme">
      <Head>
        <Title>
          {globals()?.officialName ? globals()?.officialName : globals()?.name}
        </Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="twitter:image:src" content={header()?.logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={header()?.logo} />
        <link rel="icon" type="image/png" sizes="32x32" href={header()?.logo} />
        <link rel="icon" type="image/png" sizes="16x16" href={header()?.logo} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <Meta name="twitter:site" content="@github" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content={banner()?.title} />
        <Meta name="twitter:description" content={banner()?.desc} />
        <Meta property="og:image" content={header()?.logo} />
        <Meta property="og:image:alt" content={banner()?.desc} />
        <Meta property="og:image:width" content="1200" />
        <Meta property="og:image:height" content="600" />
        <Meta property="og:site_name" content="GitHub" />
      </Head>
      <Body>
        <Suspense>
          <Toaster position="top-center" gutter={24} />

          <ErrorBoundary>
            <AuthProvider>
              <CartProvider>
                <PublicLayout>
                  <Toaster />
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </PublicLayout>
                <MobileTopBar />
              </CartProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
