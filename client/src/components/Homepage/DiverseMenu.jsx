import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import noodleImg from "../../assets/menuAnimated/noodle.png";
import riceImg from "../../assets/menuAnimated/rice.png";
import curryImg from "../../assets/menuAnimated/curry.png";
import sushiImg from "../../assets/menuAnimated/sushi.png";

const DiverseMenu = () => {
    return (
        <>
            <div className="md:px-20 lg:px-32 py-10 md:py-32 font-text1 space-y-10">

                <h1 className="text-4xl text-center font-bold ">Explore our Diverse Asian Menu</h1>

                <div className="flex flex-wrap justify-center gap-7 md:gap-20 text-center">
                    <div className="flex flex-col items-center gap-1 md:gap-2 w-3/4 md:w-48">
                        <img
                            src={noodleImg}
                            alt="Noodle image"
                            className="size-24 bg-cream rounded-full"
                        />
                        <h3 className="font-semibold">Noodle Corner</h3>
                        <p className="text-sm">Noodles for everyone! It is never too much.</p>
                        <Link
                            to="/menu"
                            className="flex items-center gap-2 font-text1 text-maroon font-medium"
                        >
                            <span>Full Menu</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="flex flex-col items-center gap-1 md:gap-2 w-3/4 md:w-48">
                        <img
                            src={riceImg}
                            alt="Rice dish image"
                            className="size-24 bg-cream rounded-full"
                        />
                        <h3 className="font-semibold">Rice Rush</h3>
                        <p className="text-sm">Checkout our 'all things rice', a never ending rice story.</p>
                        <Link
                            to="/menu"
                            className="flex items-center gap-2 font-text1 text-maroon font-medium"
                        >
                            <span>Full Menu</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="flex flex-col items-center gap-1 md:gap-2 w-3/4 md:w-48">
                        <img
                            src={curryImg}
                            alt="Curry dish image"
                            className="size-24 bg-cream rounded-full"
                        />
                        <h3 className="font-semibold">Creative Curry</h3>
                        <p className="text-sm">Curries that create an explosion of flavours.</p>
                        <Link
                            to="/menu"
                            className="flex items-center gap-2 font-text1 text-maroon font-medium"
                        >
                            <span>Full Menu</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="flex flex-col items-center gap-1 md:gap-2 w-3/4 md:w-48">
                        <img
                            src={sushiImg}
                            alt="Sushi image"
                            className="size-24 bg-cream rounded-full"
                        />
                        <h3 className="font-semibold">Sushi Specials</h3>
                        <p className="text-sm">Excuisite taste and texture. A sushi to remember.</p>
                        <Link
                            to="/menu"
                            className="flex items-center gap-2 font-text1 text-maroon font-medium"
                        >
                            <span>Full Menu</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};
export default DiverseMenu;