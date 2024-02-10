import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const useAxiosWithInterceptor = (): AxiosInstance => {
	const tokenAxios = axios.create({ baseURL: BASE_URL });
	const navigate = useNavigate();

	tokenAxios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const _originalRequest = error.config;
			if (error.response?.status === 403) {
                const goRoot = () => navigate("/test");
                goRoot()
			}
		}
	);

	return tokenAxios;
};

export default useAxiosWithInterceptor;
