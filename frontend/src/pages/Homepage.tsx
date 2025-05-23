import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';




const Homepage: React.FC = () => {
  return (
    <main className="min-h-screen pt-[20px] bg-[#FDF4DF]">
      {/* Hero Image Slider */}
      <div className="mt-[150px] px-4">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          interval={5000}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <div>
            <img src="/hero1.jpg" alt="Hero 1" />
            <p className="legend">Explore Handmade Treasures</p>
          </div>
          <div>
            <img src="/hero2.jpg" alt="Hero 2" />
            <p className="legend">Support Small Businesses</p>
          </div>
          <div>
            <img src="/hero3.jpg" alt="Hero 3" />
            <p className="legend">One-of-a-Kind Gifts</p>
          </div>
        </Carousel>
      </div>
      <section className="p-8 mt-[50px] mb-[50px] text-center">
        <h1 className="text-[#7A7C56] text-xl font-bold mt-[100px] ">
          Discover gifts for every occasion
        </h1>
      </section>
      <div className="grid grid-cols-6 gap-6 max-w-[1200px] mx-auto mb-12">
        <div className="text-center">
          <img
            src="/cat1.webp"
            alt="Personalized Gifts"
            className="rounded-full max-w-[150px] h-auto"
          />
          <p className="mt-2">Personalized Gifts</p>
        </div>
        <div className="text-center">
          <img
            src="/cat2.webp"
            alt="Gifts for Him"
            className="rounded-full max-w-[150px] h-auto"
          />
          <p className="mt-2">Gifts for Him</p>
        </div>
        <div className="text-center">
          <img
            src="/cat3.webp"
            alt="Gifts for Her"
            className="rounded-full max-w-[150px] h-auto"
          />
          <p className="mt-2">Gifts for Her</p>
        </div>
        <div className="text-center">
          <img
            src="/cat4.webp"
            alt="Gifts for Kids"
            className="rounded-full max-w-[150px] h-auto"
          />
          <p className="mt-2">Gifts for Kids</p>
        </div>
        <div className="text-center">
          <img
            src="/cat5.webp"
            alt="Outdoor Decor"
            className="rounded-full max-w-[150px] h-auto "
          />
          <p className="mt-2">Outdoor Decor</p>
        </div>
        <div className="text-center">
          <img
            src="/cat6.webp"
            alt="Travel Accessories"
            className="rounded-full max-w-[150px] h-auto"
          />
          <p className="mt-2">Travel Accessories</p>
        </div>
      </div>
      {/* Hero Feature Section */}
      <h2 className="text-[#7A7C56] text-xl font-bold mt-[80px] text-center">
        Personalized Gifts
      </h2>
      <section className="mt-12 px-8 grid grid-cols-3 md:grid-cols-3 gap-8 text-center mt-[50px] mb-[150px]">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <img
            src="/feature1.avif"
            alt="Feature 1"
            className="max-w-[300px] h-60 object-cover rounded-xl shadow-lg"
          />
          <h2 className="mt-4 text-xl font-bold text-[#7A7C56]">
            Wedding Gifts For Guests
          </h2>
          <p className="text-gray-600 mt-2">
            Make your special day memorable with personalized gifts for your
            guests.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <img
            src="/feature2.avif"
            alt="Feature 2"
            className="max-w-[300px] h-60 object-cover rounded-xl shadow-lg"
          />
          <h2 className="mt-4 text-xl font-bold text-[#7A7C56]">
            Babies Gifts
          </h2>
          <p className="text-gray-600 mt-2">
            Find the perfect gift for your little ones, from toys to clothes.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <img
            src="/feature3.webp"
            alt="Feature 3"
            className="max-w-[300px] h-60 object-cover rounded-xl shadow-lg"
          />
          <h2 className="mt-4 text-xl font-bold text-[#7A7C56]">
            Rose Gold Soaps
          </h2>
          <p className="text-gray-600 mt-2">
            Indulge in luxury with our handcrafted rose gold soaps.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
