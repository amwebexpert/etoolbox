import { ScreenContainer } from "~/components/ui/screen-container";
import { AboutCallToAction } from "./components/about-call-to-action";
import { AboutContributors } from "./components/about-contributors";
import { AboutDeploymentInfo } from "./components/about-deployment-info";
import { AboutHero } from "./components/about-hero";
import { AboutOriginStory } from "./components/about-origin-story";

export const About = () => {
  return (
    <ScreenContainer>
      <AboutHero />
      <AboutDeploymentInfo />
      <AboutContributors />
      <AboutOriginStory />
      <AboutCallToAction />
    </ScreenContainer>
  );
};
