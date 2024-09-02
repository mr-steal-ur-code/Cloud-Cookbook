import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { lazy, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import toast from "react-hot-toast";
import AppToaster from "../components/Toast/AppToaster";
import SuspenseLoader from "../components/SuspenseLoader";
import Loader from "../components/Loader";

const Modal = lazy(() => import("../components/Modal"));
const Home: React.FC = () => {
	const { isLoggedIn, emailVerified, sendVerificationEmail, signout } =
		useAuth();
	const modalRef = useRef<ModalHandle>(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return;
		//if (!isLoggedIn || emailVerified)
		setTimeout(() => {
			setShowModal(true);
		}, 500);
	}, [emailVerified, isLoggedIn]);

	const handleSendEmailVerification = async () => {
		const res = await sendVerificationEmail();
		modalRef?.current?.dismiss();
		if (res.success) {
			toast.success(res.response);
		} else toast.error(res.response);
	};
	console.log(isLoggedIn);

	return (
		<>
			<AppToaster />
			<div className="flex flex-row gap-8">
				{isLoggedIn === false ? (
					<Link to="/sign-in">sign in</Link>
				) : isLoggedIn ? (
					<Button onClick={signout} text="Sign Out" />
				) : (
					<Loader />
				)}
				<Link to="register">Register</Link>
				<Link to="recover-password">Recover password</Link>
			</div>
			<SuspenseLoader>
				<Modal
					ref={modalRef}
					isOpen={showModal}
					onClose={() => {
						setShowModal(false);
					}}
					closeButton
				>
					<div className="text-center py-12">
						<p>Please verify your E-mail</p>
						<Button
							type="text"
							text="Re-Send email"
							color="text-primary"
							onClick={handleSendEmailVerification}
						/>
					</div>
				</Modal>
			</SuspenseLoader>
		</>
	);
};

export default Home;
