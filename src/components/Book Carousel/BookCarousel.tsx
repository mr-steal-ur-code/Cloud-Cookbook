import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bookcarousel.css";

type CarouselProps = {
	objArray: any[];
};

const Carousel: React.FC<CarouselProps> = ({ objArray }) => {
	const settings: Settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		adaptiveHeight: true,
		arrows: objArray?.length >= 2,
	};
	console.log(objArray?.length);

	const handleBookClick = (id: string) => {
		console.log(id);
	};

	return (
		<div className="">
			<Slider {...settings}>
				{objArray?.map?.((obj: CookBook) => (
					<div
						key={obj.id}
						className="cursor-pointer book-container"
						onClick={() => handleBookClick(obj.id!)}
					>
						<div className="book-spine" />
						<div className="book-pages" />
						<div className="book-content">
							<p className="text-sm bg-orange-50 rounded-md p-1">
								{obj?.title}
							</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Carousel;
