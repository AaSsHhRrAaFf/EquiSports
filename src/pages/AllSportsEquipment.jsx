
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AllSportsEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipment(response.data);
      } catch (error) {
        toast.error("Failed to fetch equipment");
        console.error("Error fetching equipment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    
    const sortedEquipment = [...equipment].sort((a, b) => {
      return newOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    
    setEquipment(sortedEquipment);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Fade>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">All Sports Equipment</h2>
          <button
            onClick={handleSort}
            className="btn btn-primary"
            data-tooltip-id="sort-tooltip"
            data-tooltip-content={`Sort by price ${
              sortOrder === "asc" ? "descending" : "ascending"
            }`}
          >
            Sort by Price {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <Tooltip id="sort-tooltip" />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Stock Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.categoryName}</td>
                  <td>${item.price}</td>
                  <td>{item.rating} ⭐</td>
                  <td>
                    <span
                      className={`badge ${
                        item.stockStatus > 10
                          ? "badge-success"
                          : item.stockStatus > 0
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {item.stockStatus > 0
                        ? `${item.stockStatus} in stock`
                        : "Out of stock"}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/equipment/${item._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {equipment.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">No equipment available</p>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default AllSportsEquipment;
