import React from "react";
import image01 from "../assets/8460293_3864554.jpg";
import image02 from "../assets/Collection_of_GM_cricket_Bats_-desk_1800x.webp";
import image03 from "../assets/Collection_of_NewBalance_cricket_shoes-desk_3_1800x.webp";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      {/*  BANNER SECTION */}
      <section>
        <div className="carousel">
          <div id="item1" className="carousel-item w-full">
            <img src={image01} className="object-cover" />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img src={image03} className="object-left " />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img src={image02} className="object-right" />
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
        </div>
      </section>
      <FeaturedProducts></FeaturedProducts>
    </>
  );
}

export default Home;
