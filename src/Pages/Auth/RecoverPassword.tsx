import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Input from "../../components/Input";

const RecoverPassword: React.FC = () => {
	document.title = "Recover Password";
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const { passwordReset } = useAuth();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handlePasswordReset = async () => {
		if (!email.trim()) {
			return setMessage(
				"Please provide the email address associated with the account."
			);
		} else if (!emailRegex.test(email))
			return setMessage("Email address not valid");
		const res = await passwordReset(email);
		setMessage(res?.response);
	};

	return (
		<div className="fade-in flex flex-col gap-4 m-2 fade-in">
			<p className="font-bold p-2">
				Forgot your password? Enter the email address associated with your
				account and we'll send you instructions to reset it.
			</p>
			{message && <p className="text-danger">{message}</p>}
			<div className="flex flex-row items-center gap-8">
				<Input
					type="email"
					name="email"
					labelText="email"
					labelType="floating"
					onChange={(e) => setEmail(e.target?.value)}
				/>
				<Button text="send" type="outline" onClick={handlePasswordReset} />
			</div>
		</div>
	);
};

export default RecoverPassword;
