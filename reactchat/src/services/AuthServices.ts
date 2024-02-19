import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../config";

export function useAuthService(): AuthServiceProps {
	const login = async (username: string, password: string) => {
		try {
			const response = await axios.post(`${BASE_URL}/login/`, {
				username,
				password,
			});
			console.log(response);
		} catch (error: unknown) {
			return error;
		}
	};
	return { login };
}

export default useAuthService