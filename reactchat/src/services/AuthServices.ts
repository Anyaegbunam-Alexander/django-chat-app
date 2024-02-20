import axios from "axios";
import { useState } from "react";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../config";

export function useAuthService(): AuthServiceProps {
	const isTokenValid = () => {
		const token = localStorage.getItem("token");
		const expiry = localStorage.getItem("expiry");

		if (!token || !expiry) {
			return false;
		}

		const expiryDate = new Date(expiry);
		const currentDate = new Date();

		return currentDate <= expiryDate;
	};

	const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());
	const getUserDetails = async () => {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${BASE_URL}/account/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
	};

	const login = async (username: string, password: string) => {
		try {
			const response = await axios.post(`${BASE_URL}/login/`, {
				username,
				password,
			});
			const { token, expiry, user } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("expiry", expiry);
			localStorage.setItem("userName", user.username);
			setIsAuthenticated(true);
			console.log(isAuthenticated);
			// console.log(response);
			getUserDetails();
		} catch (error: unknown) {
			setIsAuthenticated(false);
			return error;
		}
	};
	return { login, isAuthenticated };
}

export default useAuthService;
