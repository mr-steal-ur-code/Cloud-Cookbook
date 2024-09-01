import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";

const SignIn: React.FC = () => {
	document.title = "Sign-in";
	const { emailAndPasswordSignIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSignIn = async (event) => {
		event?.preventDefault();
		const res = await emailAndPasswordSignIn(email, password);
		if (!res.success) {
			setError(res.response);
		}
	};

	return (
		<>
			<div className="fade-in mb-4 flex text-center justify-around">
				<Link className="text-content hover:opacity-75 text-lg" to="/register">
					Not signed up?{" "}
					<span className="text-primary underline underline-offset-4">
						Register Here
					</span>
				</Link>
				<Link
					className="text-content hover:opacity-75 text-lg"
					to="/recover-password"
				>
					Forgot Password?{" "}
					<span className="text-primary underline underline-offset-4">
						Recover Here
					</span>
				</Link>
			</div>
			<div className="fade-in pt-4">
				<form onSubmit={(e) => handleSignIn(e)}>
					<Input
						required
						type="email"
						labelText="Email"
						labelType="floating"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						required
						labelText="Password"
						labelType="floating"
						name="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <ErrorMessage error={error} />}
					<Button submit className="w-full" text="Sign In" />
				</form>
			</div>
		</>
	);
};

export default SignIn;
