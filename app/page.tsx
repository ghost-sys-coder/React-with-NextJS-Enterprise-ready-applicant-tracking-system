import ContactSection from "@/components/shared/ContactSection";
import FeaturesSection from "@/components/shared/FeaturesSection";
import FooterSection from "@/components/shared/FooterSection";
import HeroBox from "@/components/shared/HeroBox";
import HomePageNavbar from "@/components/shared/HomePageNavbar";
import PricingSection from "@/components/shared/PricingSection";

export default function Home() {
  return (
    <div className="homepage">
      <HomePageNavbar />
      <HeroBox />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}