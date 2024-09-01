import { lazy, Suspense, useRef, useState } from "react";
import Avatar from "./Avatar";
import PhotoCropper from "./PhotoCropper";
import ThemeSwitch from "./Theme Switch/ThemeSwitch";
import AppToaster from "./Toast/AppToaster";
import bookStore from "../store/bookStore";

const Modal = lazy(() => import("./Modal"));
const Header = () => {
	const { user } = bookStore();
	const modalRef = useRef<ModalHandle>(null);
	const [toggleModal, setToggleModal] = useState(false);
	const [clickDisabled, setClickDisabled] = useState(false);

	const handleDebounceClose = () => {
		setToggleModal(false);
		setClickDisabled(true);
		setTimeout(() => setClickDisabled(false), 300);
	};

	return (
		<div className="h-16 fixed top-0 w-full flex flex-col text-white bg-bkg2 z-50 transition-all duration-500">
			<div className={`flex flex-row items-center justify-between px-4 flex-1`}>
				<ThemeSwitch />
				<Avatar
					imageUrl={user?.avatar || null}
					onClick={() => !clickDisabled && setToggleModal(true)}
				/>
				<Suspense fallback={<div>Loading...</div>}>
					<Modal
						ref={modalRef}
						isOpen={toggleModal}
						onClose={handleDebounceClose}
					>
						<PhotoCropper
							user={user}
							onClose={() => modalRef?.current?.dismiss()}
						/>
					</Modal>
				</Suspense>
				<AppToaster />
			</div>
		</div>
	);
};

export default Header;
