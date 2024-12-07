
import React, { useState, useEffect } from "react";
import CategorySidebar from "../components/CategorySidebar";
import CategoryCard from "../components/CategoryCard";

const CategoriesPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipment");
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleCategorySelect = (category) => {
    if (!category) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.categoryName === category));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">
        Sports Categories section
      </h2>

      <div className="flex">
        <CategorySidebar onCategorySelect={handleCategorySelect} />
        <div className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <CategoryCard key={item._id} category={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
