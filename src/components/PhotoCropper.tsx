import { useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import cookStore from "../store/bookStore";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../firebase";
import Button from "./Button";

type CropperProps = {
	user?: any;
	onClose?: () => void;
	avatar?: boolean;
	storageName?: string;
} & ( // Conditional type
	| { avatar: true; onDownloadUrl?: null }
	| { avatar?: false; onDownloadUrl: (url: string) => void }
);
const PhotoCropper: React.FC<CropperProps> = ({
	user,
	onClose,
	avatar,
	storageName,
	onDownloadUrl,
}) => {
	const { saveUser } = cookStore();
	const [image, setImage] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const cropperRef = useRef<any>(null);
	const inputEl = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleClose = () => {
		setImage(null);
		(inputEl.current as HTMLInputElement).value = "";
		onClose && onClose();
	};

	const handleCrop = async () => {
		if (cropperRef.current) {
			const cropper = cropperRef.current.cropper;
			const croppedCanvas = cropper.getCroppedCanvas();
			const resizedCanvas = document.createElement("canvas");
			const resizedContext = resizedCanvas.getContext("2d")!;
			resizedCanvas.width = 200;
			resizedCanvas.height = 200;
			resizedContext.drawImage(
				croppedCanvas,
				0,
				0,
				resizedCanvas.width,
				resizedCanvas.height
			);
			try {
				setLoading(true);
				const resizedDataUrl = resizedCanvas.toDataURL();
				setPreviewUrl(resizedDataUrl);
				const directory = avatar
					? `avatar/${user?.id}/avatar`
					: `${storageName || "not named"}/${user?.id}/${new Date().toJSON()}`;
				console.log(storage);

				const storageRef = ref(storage, directory);
				console.log("ref:", storageRef);

				await uploadString(storageRef, resizedDataUrl, "data_url");
				const downloadURL = await getDownloadURL(storageRef);
				if (avatar) {
					const res = await saveUser(user?.id, { avatar: downloadURL });
					if (res.success) {
						handleClose();
						setTimeout(() => {
							toast.success("Avatar Saved");
						}, 400);
					} else {
						handleClose();
						setTimeout(() => {
							toast.error("Error Saving Avatar");
						}, 400);
					}
				}
				onDownloadUrl && onDownloadUrl(downloadURL);
			} catch (error: any) {
				setLoading(false);
				console.log("Error saving cropped Image:", error);
				toast.error("Error saving Image");
			}
		}
	};

	useEffect(() => {
		if (image && cropperRef.current) {
			const cropper = new Cropper(cropperRef.current, {
				aspectRatio: 1,
				viewMode: 1,
				center: true,
			});
			return () => {
				cropper.destroy();
			};
		}
	}, [image]);

	return (
		<div className="flex flex-row gap-4 items-center justify-center">
			<img
				onClick={() => inputEl?.current?.click()}
				className="rounded-xl cursor-pointer hover:shadow-content hover:shadow-lg transition-all duration-500"
				height="80px"
				width="80px"
				src={user ? user?.avatar || "/assets/svg/no-image.svg" : previewUrl}
			/>
			<div className="text-center">
				<input
					ref={inputEl}
					style={{ display: "none" }}
					type="file"
					onChange={handleFileChange}
				></input>
				<button
					onClick={() => inputEl?.current?.click()}
					className="p-2 border-b-transparent hover:border-b font-semibold hover:text-primary hover:border-primary transition-all duration-500"
				>
					{user ? "Update Avatar" : "Select Image"}
				</button>
				{image && (
					<div className="absolute left-0 -top-1 z-50 w-full  flex flex-col items-center">
						<div className="sm:w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
							<img ref={cropperRef} src={image} alt="Cropper Preview" />
							<div className="flex flex-row justify-around p-2 bg-secondary">
								<Button
									type="cancel"
									text="Cancel"
									onClick={() => handleClose()}
								/>
								<Button
									loading={loading}
									disabled={loading}
									text="Save"
									onClick={handleCrop}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PhotoCropper;
