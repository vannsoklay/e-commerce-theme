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
	const username = read("username");
	return (
		<Html lang="en" data-theme="mytheme">
			<Head>
				<Title>{username()}</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
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
