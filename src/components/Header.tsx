import { lazy, useRef, useState } from "react";
import Avatar from "./Avatar";
import PhotoCropper from "./PhotoCropper";
import ThemeSwitch from "./Theme Switch/ThemeSwitch";
import AppToaster from "./Toast/AppToaster";
import bookStore from "../store/bookStore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../utils/formatTimestamp";
import SuspenseLoader from "./SuspenseLoader";

const Modal = lazy(() => import("./Modal"));
const Header = () => {
	const { user } = bookStore();
	const { isLoggedIn } = useAuth();
	const modalRef = useRef<ModalHandle>(null);
	const [toggleModal, setToggleModal] = useState(false);
	const [clickDisabled, setClickDisabled] = useState(false);

	const handleDebounceClose = () => {
		setToggleModal(false);
		setClickDisabled(true);
		setTimeout(() => setClickDisabled(false), 300);
	};

	return (
		<div className="h-16 fixed top-0 w-full flex flex-col text-white bg-bkg2 z-50">
			<div className={`flex flex-row items-center justify-between px-4 flex-1`}>
				<ThemeSwitch />
				<Avatar
					imageUrl={user?.avatar || null}
					onClick={() => !clickDisabled && setToggleModal(true)}
				/>
				<SuspenseLoader>
					<Modal
						ref={modalRef}
						isOpen={toggleModal}
						onClose={handleDebounceClose}
					>
						<div className="py-6">
							{isLoggedIn ? (
								<div>
									<p>
										Account Created:{" "}
										{formatTimestamp(user?.createdAt, "shortDate")}
									</p>
									<PhotoCropper
										user={user}
										onClose={() => modalRef?.current?.dismiss()}
									/>
								</div>
							) : (
								<>
									<Link
										className="border-b-2 hover:text-primary hover:border-b-primary transition-colors duration-300"
										to="/sign-in"
										onClick={() => modalRef?.current?.dismiss()}
									>
										Sign-In
									</Link>
									<span> to access your account</span>
								</>
							)}
						</div>
					</Modal>
				</SuspenseLoader>
				<AppToaster />
			</div>
		</div>
	);
};

export default Header;
