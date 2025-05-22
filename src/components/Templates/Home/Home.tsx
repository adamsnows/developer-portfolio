import AdvancedTransition from "@/components/Animations/AdvancedTransition";
import SmoothScrollSection from "@/components/Animations/SmoothScrollSection";
import BackendExpertise from "@/components/Other/BackendExpertise/BackendExpertise";
import DevToPosts from "@/components/Other/DevToPosts/DevToPosts";
import FrontendExpertise from "@/components/Other/FrontendExpertise/FrontendExpertise";
import InitialHome from "@/components/Other/InitialHome/InitialHome";
import Reviews from "@/components/Other/Reviews/Reviews";
import Work from "@/components/Other/Work/Work";

const Home = () => {
  return (
    <AdvancedTransition>
      <div className="overflow-hidden">
        <InitialHome />
        <SmoothScrollSection>
          <DevToPosts />
        </SmoothScrollSection>
        <SmoothScrollSection>
          <Work />
        </SmoothScrollSection>
        <SmoothScrollSection>
          <FrontendExpertise />
        </SmoothScrollSection>
        <SmoothScrollSection>
          <BackendExpertise />
        </SmoothScrollSection>
        <SmoothScrollSection>
          <Reviews />
        </SmoothScrollSection>
      </div>
    </AdvancedTransition>
  );
};

export default Home;
