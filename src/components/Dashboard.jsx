import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setItems, deleteItem } from "../features/itemsSlice";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  // Redux dispatch function for sending actions
  const dispatch = useDispatch();

  // Selector to get items and search query from Redux store
  const items = useSelector((state) => state.items.items);
  const searchQuery = useSelector((state) => state.items.searchQuery || "");

  // React Router hook for navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if no token is present in localStorage
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    // Fetch items from the API and update the Redux store
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        dispatch(setItems(data.items || []));  
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, [dispatch, navigate]);

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      dispatch(deleteItem(id)); 
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-400 p-6 text-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold uppercase mb-6 text-center">Dashboard</h2>
        <SearchBar />
        <ul className="mb-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.id}
                className="bg-white py-4 px-6 mb-4 rounded-xl shadow-md flex xl:flex-row flex-col justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
                <div className="flex space-x-4 sm:pt-2">
                  <button
                    onClick={() => navigate(`/items/${item.id}`)}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/items/edit/${item.id}`)}
                    className="text-green-600 font-bold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center font-semibold text-red-700">Item not available.</p>
          )}
        </ul>
        <button
          onClick={() => navigate("/items/create")}
          className="bg-gray-600 text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Create New Item
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
