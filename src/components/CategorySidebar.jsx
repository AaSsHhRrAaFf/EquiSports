
import React, { useEffect, useState } from 'react';

const CategorySidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Categories');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/equipment');
        const data = await response.json();
        const uniqueCategories = [
          ...new Set(data.map(item => item.categoryName)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = category => {
    setActiveCategory(category);
    onCategorySelect(category === 'All Categories' ? null : category);
  };

  return (
    <div className="w-64 p-4 bg-gray-100 border-r">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        <li>
          <button
            onClick={() => handleCategoryClick('All Categories')}
            className={`block w-full text-left px-4 py-2 rounded-md mb-2 ${
              activeCategory === 'All Categories'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            All Categories
          </button>
        </li>
        {categories.map(category => (
          <li key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={`block w-full text-left px-4 py-2 rounded-md mb-2 ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
