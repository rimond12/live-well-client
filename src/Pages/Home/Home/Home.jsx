import React from "react";
import Banner from "../../Shared/Banner/Banner";
import AboutSection from "../../Shared/AboutSection/AboutSection";
import CouponSection from "../../Shared/CouponSection/CouponSection";
import LocationSection from "../../Shared/LocationSection/LocationSection";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <AboutSection></AboutSection>
      <CouponSection></CouponSection>
      <LocationSection></LocationSection>
    </>
  );
};

export default Home;
