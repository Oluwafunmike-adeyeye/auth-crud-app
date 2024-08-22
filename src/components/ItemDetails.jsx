import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetails = () => {
  // Extract item ID from URL parameters
  const { id } = useParams();

  // State to hold the item data, loading status, and any error messages
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Fetch item details when component mounts or when `id` changes
  useEffect(() => {
    const fetchItem = async () => {
      try {
        // Fetch item data from API
        const response = await fetch(`/api/items/${id}`);
        
        if (!response.ok) {
          throw new Error("Item not found");
        }

        // Parse response data
        const data = await response.json();
        console.log("Fetched item data:", data);
        setItem(data);
      } catch (error) {
        // Log and set error message
        console.error("Failed to fetch item:", error);
        setError(error.message);
      } finally {
        // Update loading state
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Display error message if there was an issue fetching the item
  if (error) return <p>Error: {error}</p>;

  // Display a message if the item is not found
  if (!item) return <p>Item not found</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white text-gray-800 p-8 rounded-xl mx-4 shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 uppercase text-center">Item Details</h2>
            <p className="font-semibold text-lg">Name: {item.name}</p>
            <p className="text-gray-500">Description: {item.description}</p>
            <div className="flex flex-col xl:flex-row xl:gap-4 justify-center items-center">
                <button
                onClick={() => navigate(`/items/edit/${id}`)}
                className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-800 mt-4"
                >
                Edit Item
                </button>
                <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-600 text-white py-2 px-4 rounded-xl hover:bg-gray-800 mt-4 ml-4"
                >
                Back to Dashboard
                </button>
        </div>
        
      </div>
    </div>
  );
};

export default ItemDetails;
