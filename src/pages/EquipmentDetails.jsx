import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const EquipmentDetails = () => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/equipment/${id}`);
        setEquipment(response.data);
      } catch (error) {
       /*  toast.error('Failed to fetch equipment details');
        console.error('Error fetching equipment details:', error);
        navigate('/equipment'); */
        // Handle different error scenarios
      if (error.response && error.response.status === 404) {
        toast.error('Equipment not found');
        navigate('/all-equipment');
      } else {
        toast.error('Failed to fetch equipment details');
        console.error('Error fetching equipment details:', error);
      }
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id, navigate]);

  const handleAddToCart = () => {
    
    toast.success(`Added ${quantity} ${equipment.itemName} to cart`);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0 && newQuantity <= equipment.stockStatus) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!equipment) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="mr-2" /> Back to Equipment
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
          <img 
            src={equipment.image} 
            alt={equipment.itemName} 
            className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{equipment.itemName}</h1>
            <p className="text-gray-600 text-lg mt-2">{equipment.categoryName}</p>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-primary mr-4">${equipment.price}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index} 
                  className={`w-5 h-5 ${
                    index < Math.floor(equipment.rating) 
                      ? 'text-yellow-500' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
              <span className="ml-2 text-gray-600">({equipment.rating})</span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <span 
              className={`badge badge-lg ${
                equipment.stockStatus > 10 
                  ? 'badge-success' 
                  : equipment.stockStatus > 0 
                    ? 'badge-warning' 
                    : 'badge-error'
              }`}
            >
              {equipment.stockStatus > 0 
                ? `${equipment.stockStatus} in stock` 
                : 'Out of stock'}
            </span>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{equipment.description || 'No description available'}</p>
          </div>

          {/* Quantity Selector and Add to Cart */}
          {equipment.stockStatus > 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 bg-gray-100 rounded-l-lg"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 bg-gray-100 rounded-r-lg"
                  disabled={quantity >= equipment.stockStatus}
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary flex items-center"
              >
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;