import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<div className="fade-in flex flex-col items-center gap-8">
			<div>
				<p className="text-2xl p-2">Error 404</p>
				<p>Page Not Found</p>
			</div>
			<Link className="underline underline-offset-2" to="/">
				Return Home
			</Link>
		</div>
	);
};

export default NotFound;
