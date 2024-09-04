import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bookcarousel.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type CarouselProps = {
	objArray: any[];
};

const Carousel: React.FC<CarouselProps> = ({ objArray }) => {
	const matches = useMediaQuery("(max-width:28rem)");
	const settings: Settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: matches ? 1 : 2,
		slidesToScroll: 1,
		adaptiveHeight: true,
		arrows: !matches && objArray?.length >= 2,
	};

	const handleBookClick = (id: string) => {
		console.log(id);
	};

	return (
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
						<p className="text-sm bg-orange-50 rounded-md p-1">{obj?.title}</p>
					</div>
				</div>
			))}
		</Slider>
	);
};

export default Carousel;
