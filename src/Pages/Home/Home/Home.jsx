import React from "react";
import Banner from "../../Shared/Banner/Banner";
import AboutSection from "../../Shared/AboutSection/AboutSection";
import CouponSection from "../../Shared/CouponSection/CouponSection";
import LocationSection from "../../Shared/LocationSection/LocationSection";
import FeaturedApartments from "../../Shared/FeaturedApartments/FeaturedApartments";
import ServicesSection from "../../Shared/ServicesSection/ServicesSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Banner></Banner>
      <AboutSection></AboutSection>
      <CouponSection></CouponSection>
      <FeaturedApartments></FeaturedApartments>
      <LocationSection></LocationSection>\
      <ServicesSection></ServicesSection>
    </div>
  );
};

export default Home;
