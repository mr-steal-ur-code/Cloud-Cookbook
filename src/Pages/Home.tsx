import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import toast from "react-hot-toast";
import AppToaster from "../components/Toast/AppToaster";

const Home: React.FC = () => {
	const { emailVerified, sendVerificationEmail } = useAuth();
	const modalRef = useRef<ModalHandle>(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (emailVerified) return;
		setTimeout(() => {
			setShowModal(true);
		}, 800);
	}, [emailVerified]);

	return (
		<>
			<AppToaster />
			<div className="flex flex-row gap-8">
				<Link to="/sign-in">sign in</Link>
				<Link to="register">Register</Link>
				<Link to="recover-password">Recover password</Link>
			</div>
			<Modal
				ref={modalRef}
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				closeButton
			>
				<div className="flex flex-row items-center py-12">
					<p>Please verify your E-mail</p>
					<Button
						text="Re-Send"
						onClick={() => {
							sendVerificationEmail();
							modalRef?.current?.dismiss();
							setTimeout(() => {
								toast.success("Verification Email Sent");
							}, 300);
						}}
					/>
				</div>
			</Modal>
		</>
	);
};

export default Home;
