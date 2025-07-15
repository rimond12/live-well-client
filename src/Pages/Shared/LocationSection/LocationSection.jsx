import React from "react";

const LocationSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center my-15">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            📍 Our Location
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            LiveWell Apartments is located at the heart of Dhaka city — near
            Gulshan-2. It’s easily accessible by bus, rickshaw, and car. With
            nearby restaurants, parks, and schools, our location is perfect for
            families and professionals.
          </p>
          <p className="text-md text-gray-600">
            Address: House #15, Road #3, Gulshan 2, Dhaka 1212, Bangladesh
          </p>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="LiveWell Apartment Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.774048151768!2d90.4170160758905!3d23.754312588082904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a79f1bfb09%3A0xf89cf95c1f83189b!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625678172345!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
