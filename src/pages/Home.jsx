import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image01 from "../assets/8460293_3864554.jpg";
import image02 from "../assets/Collection_of_GM_cricket_Bats_-desk_1800x.webp";
import image03 from "../assets/Collection_of_NewBalance_cricket_shoes-desk_3_1800x.webp";
import FeaturedProducts from "../components/FeaturedProducts";
import SpecialOffers from "../components/SpecialOffers";
import FeaturedAthletes from "../components/FeaturedAthletes";
import CategoriesPage from './CategoriesPage';

function Home() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/equipment`);
        const equipment = response.data;

        const categoryMap = {};
        equipment.forEach((item) => {
          if (!categoryMap[item.categoryName]) {
            categoryMap[item.categoryName] = {
              name: item.categoryName,
              image: item.image,
              count: 0,
            };
          }
          categoryMap[item.categoryName].count += 1;
        });

        setCategories(Object.values(categoryMap));
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading categories...</p>;

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

      <CategoriesPage/>

      <SpecialOffers />

      
      <FeaturedAthletes />


    </>
  );
}

export default Home;
