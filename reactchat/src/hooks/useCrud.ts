import { useState } from "react";
import { BASE_URL } from "../config";
import useAxiosWithInterceptor from "../helpers/tokeninterceptor";

interface IUseCRUD<T> {
	dataCRUD: T[];
	fetchData: () => Promise<void>;
	error: Error | null;
	isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): IUseCRUD<T> => {
	const tokenAxios = useAxiosWithInterceptor();
	const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await tokenAxios.get(`${BASE_URL}${apiURL}`, {});
			const data = response.data;
			setDataCRUD(data);
			setError(null);
			setIsLoading(false);
			return data;
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				setError(new Error("400"));
			}
			setIsLoading(false);
			throw error;
		}
	};
	return { fetchData, dataCRUD, error, isLoading };
};

export default useCrud;
