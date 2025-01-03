import AboutUs from "../components/Homepage/AboutUs";
import ExploreFood from "../components/Homepage/ExploreFood";
import Hero from "../components/Homepage/Hero";
import Reviews from "../components/Homepage/Reviews";
import ActionButtons from "../components/Homepage/ActionButtons";
import Contact from "../components/Homepage/Contact";
import DiverseMenu from "../components/Homepage/DiverseMenu";

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