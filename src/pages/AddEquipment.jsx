
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddEquipment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const equipmentData = {
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

    try {
      
       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/equipment/add`, equipmentData);
        
      
      if (response.data.success) {
        toast.success('Equipment added successfully!');
        navigate('/my-equipment');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add equipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Equipment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div>
            <label className="label">Image URL</label>
            <input 
              type="url" 
              name="image"
              required
              className="input input-bordered w-full"
              placeholder="Enter image URL"
            />
          </div>

          {/* Item Name */}
          <div>
            <label className="label">Item Name</label>
            <input 
              type="text" 
              name="itemName"
              required
              className="input input-bordered w-full"
              placeholder="Enter item name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select 
              name="categoryName"
              required
              className="select select-bordered w-full"
            >
              <option value="">Select category</option>
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Swimming">Swimming</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="label">Price</label>
            <input 
              type="number" 
              name="price"
              required
              min="0"
              step="0.01"
              className="input input-bordered w-full"
              placeholder="Enter price"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="label">Rating</label>
            <input 
              type="number" 
              name="rating"
              required
              min="0"
              max="5"
              step="0.1"
              className="input input-bordered w-full"
              placeholder="Enter rating (0-5)"
            />
          </div>

          {/* Stock Status */}
          <div>
            <label className="label">Stock Status</label>
            <input 
              type="number" 
              name="stockStatus"
              required
              min="0"
              className="input input-bordered w-full"
              placeholder="Enter available quantity"
            />
          </div>

          {/* Processing Time */}
          <div>
            <label className="label">Processing Time</label>
            <input 
              type="text" 
              name="processingTime"
              required
              className="input input-bordered w-full"
              placeholder="e.g., 2-3 business days"
            />
          </div> 
          <div>
            <label className="label">Customization Options</label>
            <input 
              type="text" 
              name="customization"
              required
              className="input input-bordered w-full"
              placeholder="e.g., Extra grip, Custom color"
            />
          </div>

          {/* Read-only User Info */}
          <div>
            <label className="label">User Email</label>
            <input 
              type="email" 
              value={user.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">User Name</label>
            <input 
              type="text" 
              value={user.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea 
            name="description"
            required
            className="textarea textarea-bordered w-full h-32"
            placeholder="Enter detailed description"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Equipment'}
        </button>
      </form>
    </div>
  );
};

export default AddEquipment;
