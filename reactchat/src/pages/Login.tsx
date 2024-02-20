import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../contexts/AuthContext";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuthServiceContext();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			const { username, password } = values;
			const response = await login(username, password);
			if (response) {
				console.log(response);
			} else {
				navigate("/test-login");
			}
		},
	});
	return (
		<>
			<h1>Login</h1>
			<form onSubmit={formik.handleSubmit}>
				<label>Username</label>
				<input
					id="username"
					name="username"
					type="text"
					value={formik.values.username}
					onChange={formik.handleChange}
				/>
				<label>Password</label>
				<input
					id="password"
					name="password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Login;
