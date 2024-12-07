
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext'; 
import { Fade } from 'react-awesome-reveal'; 

const MyEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/api/equipment/user/${user.email}`);
        setEquipment(response.data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        toast.error('Failed to load equipment');
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) { 
      fetchEquipment();
    }
  }, [user?.email]); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipment/${id}`);
      setEquipment(equipment.filter(item => item._id !== id));
      toast.success('Equipment deleted successfully');
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('Failed to delete equipment');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Equipment</h2>

      {equipment.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">No equipment added yet</p>
          <Link 
            to="/add-equipment"
            className="btn btn-primary mt-4"
          >
            Add Equipment
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <Fade key={item._id}>
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img 
                    src={item.image}
                    alt={item.itemName}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{item.itemName}</h3>
                  <p className="text-sm text-gray-600">{item.categoryName}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-primary font-bold">
                      ${item.price}
                    </span>
                    <div className="badge badge-accent">
                      {item.stockStatus} in stock
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link 
                      to={`/update-equipment/${item._id}`}
                      className="btn btn-primary btn-sm"
                     
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this equipment?</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
              <button 
                className="btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEquipment;
