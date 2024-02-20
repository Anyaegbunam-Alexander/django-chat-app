import { useAuthServiceContext } from "../contexts/AuthContext";

const TestLogin = () => {
	const { isAuthenticated } = useAuthServiceContext();
	return <>{isAuthenticated.toString()}</>;
};

export default TestLogin;
