import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../contexts/ThemeContext";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

const EquipmentDetails = () => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        setLoading(true);
     
        
         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/equipment/${id}`);
        
        setEquipment(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Equipment not found");
          navigate("/all-equipment");
        } else {
          toast.error("Failed to fetch equipment details");
          console.error("Error fetching equipment details:", error);
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
    <Fade>
      <div
        className={`container mx-auto px-4 py-8 ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center hover:text-primary transition-colors duration-200 mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
          data-tooltip-id="back-tooltip"
          data-tooltip-content="Return to previous page"
        >
          <ArrowLeft className="mr-2" /> Back to Equipment
        </button>
        <Tooltip id="back-tooltip" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            } rounded-lg p-6 flex items-center justify-center transition-colors duration-300`}
          >
            <img
              src={equipment.image}
              alt={equipment.itemName}
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {equipment.itemName}
              </h1>
              <p
                className={`text-lg mt-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {equipment.categoryName}
              </p>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-semibold text-primary">
                ${equipment.price}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(equipment.rating)
                        ? "text-yellow-500"
                        : theme === "dark"
                        ? "text-gray-600"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span
                  className={`ml-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  ({equipment.rating})
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <span
                className={`badge badge-lg ${
                  equipment.stockStatus > 10
                    ? "badge-success"
                    : equipment.stockStatus > 0
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                {equipment.stockStatus > 0
                  ? `${equipment.stockStatus} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Description
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {equipment.description || "No description available"}
              </p>
            </div>

            {/* Quantity Selector and Add to Cart */}
            {equipment.stockStatus > 0 && (
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center border rounded-lg ${
                    theme === "dark" ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className={`px-3 py-2 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    } rounded-l-lg transition-colors duration-200`}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>

                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className={`px-3 py-2 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    } rounded-r-lg transition-colors duration-200`}
                    disabled={quantity >= equipment.stockStatus}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex items-center hover:scale-105 transition-transform duration-200"
                  data-tooltip-id="cart-tooltip"
                  data-tooltip-content="Add items to your cart"
                >
                  <ShoppingCart className="mr-2" /> Add to Cart
                </button>
                <Tooltip id="cart-tooltip" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default EquipmentDetails;
