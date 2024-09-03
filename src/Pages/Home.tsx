import { lazy, useEffect, useState } from "react";
import { createDoc, killDoc, listDocs } from "../actions/firebaseClientCalls";
import toast from "react-hot-toast";
import bookStore from "../store/bookStore";
import Button from "../components/Button";
import SuspenseLoader from "../components/SuspenseLoader";
import Input from "../components/Input";
import { MdLibraryAdd } from "react-icons/md";
import { TbLibraryMinus } from "react-icons/tb";
import BookCarousel from "../components/Book Carousel/BookCarousel";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const Modal = lazy(() => import("../components/Modal"));
const Home: React.FC = () => {
	const { user } = bookStore();
	const { isLoggedIn } = useAuth();
	const [books, setBooks] = useState<any[] | undefined>(undefined);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [clickDisabled, setClickDisabled] = useState(false);

	useEffect(() => {
		if (!user) return;
		fetchBooks();
	}, [user]);

	const fetchBooks = async () => {
		const res = await listDocs(`cookbooks/${user?.id}/books`);

		if (res.success) {
			setBooks(res.response);
		} else toast.error(res.response);
	};

	const handleDebounceClose = () => {
		setClickDisabled(true);
		setShowAddModal(false);
		setShowDeleteModal(false);
		setTimeout(() => setClickDisabled(false), 450);
	};

	const handleBookSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const title = data?.get("title") || "";
		const description = data?.get("description") || "";
		const res = await createDoc(`cookbooks/${user?.id}/books`, {
			title,
			description,
		});
		handleDebounceClose();
		if (res.success) {
			fetchBooks();
			toast.success("Cook Book Added!");
		} else toast.error("Error adding cook book");
	};

	const handleDelete = async (id: string) => {
		const res = await killDoc(`cookbooks/${user?.id}/books`, id);
		if (res.success) {
			toast.success("Cook Book Deleted");
			fetchBooks();
		} else {
			toast.error("Error Deleting Cook Book");
		}
		handleDebounceClose();
	};

	return (
		<>
			{isLoggedIn && books && books?.length > 0 ? (
				<BookCarousel objArray={books} />
			) : isLoggedIn && books === undefined ? (
				<Loader size="lg" />
			) : isLoggedIn ? (
				<p className="text-center">Add a cook book to get started!</p>
			) : null}
			<div className="p-2">
				<div
					className="flex p-6 float-left cursor-pointer hover:text-xl"
					onClick={() => !clickDisabled && setShowDeleteModal(!showDeleteModal)}
				>
					<TbLibraryMinus className="text-content" size={36} />
				</div>
				<div
					className="flex p-6 float-right cursor-pointer hover:text-xl"
					onClick={() => !clickDisabled && setShowAddModal(!showAddModal)}
				>
					<MdLibraryAdd className="text-content" size={36} />
				</div>
			</div>
			<SuspenseLoader>
				<Modal closeButton isOpen={showAddModal} onClose={handleDebounceClose}>
					<form
						onSubmit={(e) => {
							handleBookSubmit(e);
						}}
						className="flex flex-col gap-4 pt-4 pb-12"
					>
						<Input
							required
							name="title"
							labelText="Title"
							labelType="floating"
						/>
						<label
							htmlFor="description"
							className="text-lg font-medium text-content"
						>
							Description:
							<textarea
								className="appearance-none block w-full max-h-60 rounded-lg px-3 py-2 text-content  font-medium bg-bkg2 border-2 border-tertiary focus:border-primary focus:outline-none resize-y transition-colors duration-200"
								rows={4}
								name="description"
							></textarea>
						</label>
						<Button submit text="Save" type="outline" />
					</form>
				</Modal>
			</SuspenseLoader>
			<SuspenseLoader>
				<Modal
					closeButton
					isOpen={showDeleteModal}
					onClose={handleDebounceClose}
				>
					<div className="flex flex-col gap-4 pt-4 pb-12">
						{books?.map((book: CookBook) => (
							<p
								className="overflow-y-scroll text-lg text-danger"
								key={book?.id}
								onClick={() => handleDelete(book.id!)}
							>
								Delete {book?.title}
							</p>
						))}
					</div>
				</Modal>
			</SuspenseLoader>
		</>
	);
};

export default Home;

{
	/* <Select
placeholder="Recipe Category"
name="recipeCategory"
data={[{ text: "", value: "" }]}
/>
<Select
placeholder="Dish Category"
name="dishCategory"
data={[{ text: "", value: "" }]}
/>
<Select
placeholder="Type"
name="type"
data={[{ text: "", value: "" }]}
/> */
}
