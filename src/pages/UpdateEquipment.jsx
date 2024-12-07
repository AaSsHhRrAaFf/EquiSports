
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const UpdateEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState(null);


  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/equipment/${id}`);
       
        setEquipment(response.data);
        console.log('Fetched Equipment:', response); 
      } catch (error) {
        console.error('Error fetching equipment details:', error);
        toast.error('Failed to fetch equipment details');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      image: form.image.value,
      itemName: form.itemName.value,
      categoryName: form.categoryName.value,
      description: form.description.value,
      price: parseFloat(form.price.value),
      rating: parseFloat(form.rating.value),
      customization: form.customization.value,
      processingTime: form.processingTime.value,
      stockStatus: parseInt(form.stockStatus.value),
      userEmail: user.email, 
      userName: user.displayName 
    };
    console.log('Updated Data:', updatedData); 
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/equipment/${id}`, updatedData);
    
      toast.success('Equipment updated successfully!');
      navigate('/my-equipment');
    } catch (error) {
      console.error('Error updating equipment:', error); 
      toast.error('Failed to update equipment');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!equipment) return <div>Equipment not found</div>;


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Update Equipment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image URL */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={equipment.image}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Item Name */}
        <div>
          <label className="label">Item Name</label>
          <input
            type="text"
            name="itemName"
            defaultValue={equipment.itemName}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <input
            type="text"
            name="categoryName"
            defaultValue={equipment.categoryName}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            defaultValue={equipment.description}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={equipment.price}
            step="0.01"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="label">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            defaultValue={equipment.rating}
            min="0"
            max="5"
            step="0.1"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Customization */}
        <div>
          <label className="label">Customization Options</label>
          <input
            type="text"
            name="customization"
            defaultValue={equipment.customization}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Processing Time */}
        <div>
          <label className="label">Processing Time</label>
          <input
            type="text"
            name="processingTime"
            defaultValue={equipment.processingTime}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="label">Stock Status</label>
          <input
            type="number"
            name="stockStatus"
            defaultValue={equipment.stockStatus}
            min="0"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Read-only User Info */}
        <div>
          <label className="label">User Email</label>
          <input
            type="email"
            value={user.email}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div>
          <label className="label">User Name</label>
          <input
            type="text"
            value={user.displayName}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-6"

        >
          Update Equipment
        </button>
      </form>
    </div>
  );
};

export default UpdateEquipment;
