export interface AuthServiceProps {
	login: (username: string, password: string) => unknown;
	// logout: () => void
	isAuthenticated: boolean;
}
