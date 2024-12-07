
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from './shared/LoadingSpinner';
import { ThemeContext } from "../contexts/ThemeContext";
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios('http://localhost:5000/api/equipment/featured');
        
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Featured Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className={`rounded-lg shadow-md overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
              }`}>
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{product.itemName}</h3>
                <p className="text-gray-600 mb-2">{product.categoryName}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Link
                    to={`/equipment/${product._id}`}
                    className={`btn btn-sm ${
                      theme === 'dark' ? 'btn-secondary' : 'btn-primary'
                    }`}
                  >
                    View Details
                  </Link>
                </div>
                <div className="mt-2">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Stock: {product.stockStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
