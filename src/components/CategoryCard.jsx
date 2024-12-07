
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  

  const image = category?.image || "https://via.placeholder.com/150";
  const name = category?.categoryName || "Unknnown Category";
  const count = category?.stockStatus
  || 0;

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{count} items</p>
      <button
        onClick={() => navigate(`/categories/${name}`)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        View Items
      </button>
    </div>
  );
};

export default CategoryCard;
