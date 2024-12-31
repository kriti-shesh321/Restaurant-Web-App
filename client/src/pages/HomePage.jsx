import AboutUs from "../componenets/Homepage/AboutUs";
import ExploreFood from "../componenets/Homepage/ExploreFood";
import Hero from "../componenets/Homepage/Hero";
import Reviews from "../componenets/Homepage/Reviews";
import ActionButtons from "../componenets/Homepage/ActionButtons";
import Contact from "../componenets/Homepage/Contact";
import DiverseMenu from "../componenets/Homepage/DiverseMenu";

const HomePage = () => {
    return (
        <>
            <section id="hero">
                <Hero />
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

            <section id="reviews">
                <Reviews />
            </section>

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