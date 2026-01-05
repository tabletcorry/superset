import { createContext, type ReactNode, useContext, useState } from "react";
import { isLocalOnly } from "renderer/env.renderer";
import { trpc } from "renderer/lib/trpc";
import { SignInScreen } from "renderer/screens/sign-in";

interface AuthContextValue {
	accessToken: string;
	isAuthenticated: true;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null | undefined>(
		() => (isLocalOnly ? "local-only" : undefined),
	);

	trpc.auth.onAccessToken.useSubscription(undefined, {
		onData: (data) => {
			if (!isLocalOnly) {
				setAccessToken(data.accessToken);
			}
		},
		onError: (err) => {
			if (!isLocalOnly) {
				console.error("[AuthProvider] Token subscription error:", err);
			}
		},
	});

	if (isLocalOnly) {
		const value: AuthContextValue = {
			accessToken: "local-only",
			isAuthenticated: true,
		};

		return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
	}

	if (accessToken === undefined) {
		return null;
	}

	if (accessToken === null) {
		return <SignInScreen />;
	}

	const value: AuthContextValue = {
		accessToken,
		isAuthenticated: true,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};
