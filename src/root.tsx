// @refresh reload
import { Suspense } from "solid-js";
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
import "./root.css";
import PublicLayout from "./components/layout/Public";
import AuthProvider from "./contexts/useAuth";
import { CartProvider } from "./contexts/useCart";
import { Toaster } from "solid-toast";
import { read } from "./utils/theme";
import MobileTopBar from "./components/layout/MobileBottom";

export default function Root() {
  const username = read("username");
  
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <Title>{username()}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
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
