import AdvancedTransition from "@/components/Animations/AdvancedTransition";
import About from "@/components/Other/About/About";
import BackendExpertise from "@/components/Other/BackendExpertise/BackendExpertise";
import Contact from "@/components/Other/Contact/Contact";
import FrontendExpertise from "@/components/Other/FrontendExpertise/FrontendExpertise";
import InitialHome from "@/components/Other/InitialHome/InitialHome";
import Reviews from "@/components/Other/Reviews/Reviews";
import Services from "@/components/Other/Services/Services";
import Work from "@/components/Other/Work/Work";

const Home = () => {
  return (
    <AdvancedTransition>
      <InitialHome />
      <About />
      <Services />
      <FrontendExpertise />
      <Work />
      <BackendExpertise />
      <Reviews />
      <Contact />
    </AdvancedTransition>
  );
};

export default Home;
