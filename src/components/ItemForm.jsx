import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItem, updateItem } from "../features/itemsSlice";

const ItemForm = () => {
  // Local state to hold form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Redux dispatch function
  const dispatch = useDispatch();
  // React Router hooks for navigation and URL parameters
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing item data if an ID is provided
  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        const response = await fetch(`/api/items/${id}`);
        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
      };

      fetchItem();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST"; 
    const url = id ? `/api/items/${id}` : "/api/items"; 

    // Send request to server
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    const updatedItem = await response.json();

    // Dispatch action to update Redux store
    if (id) {
      dispatch(updateItem(updatedItem));
    } else {
      dispatch(addItem(updatedItem));
    }
    // Redirect to dashboard after submission
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center px-4 h-screen bg-gray-100">
      <div className="bg-white text-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 uppercase text-center">
          {id ? "Update Item" : "Create Item"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white font-bold text-base py-2 rounded-xl hover:bg-gray-800 transition-colors"
          >
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
