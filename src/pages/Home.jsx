import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeaturedProducts from "../components/FeaturedProducts";
import SpecialOffers from "../components/SpecialOffers";
import FeaturedAthletes from "../components/FeaturedAthletes";
import CategoriesPage from './CategoriesPage';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Banner from '../components/Banner';

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

  if (loading) return <LoadingSpinner/>;

  return (
    <>
      <Banner/>
      <FeaturedProducts></FeaturedProducts>

      <CategoriesPage/>

      <SpecialOffers />

      
      <FeaturedAthletes />


    </>
  );
}

export default Home;
