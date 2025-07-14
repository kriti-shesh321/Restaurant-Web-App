import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/Auth/AuthContext.jsx";
import ReviewContext from "../context/Restaurant/ReviewContext.jsx";
import AboutUs from "../components/Homepage/AboutUs";
import ExploreFood from "../components/Homepage/ExploreFood";
import Hero from "../components/Homepage/Hero";
import Reviews from "../components/Homepage/Reviews";
import ActionButtons from "../components/Homepage/ActionButtons";
import Contact from "../components/Homepage/Contact";
import DiverseMenu from "../components/Homepage/DiverseMenu";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const { getReviews } = useContext(ReviewContext);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviews = await getReviews(3);
                reviews && setReviews(reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [getReviews]);

    return (
        <>
            <section id="hero">
                <Hero user={user} />
            </section>

            <section>
                <DiverseMenu />
            </section>

            <section id="about">
                <AboutUs />
            </section>

            <section id="exploreFood">
                <ExploreFood />
            </section>

            {/* <section id="reviews">
                <Reviews data={reviews} />
            </section> */}

            <section>
                <ActionButtons />
            </section>

            <section id="contact">
                <Contact />
            </section>
        </>
    );
};
export default HomePage;