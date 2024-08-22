import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/itemsSlice";

const SearchBar = () => {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle search input changes
  const handleSearch = (e) => {
    // Dispatch action to update the search query in the Redux store
    dispatch(setSearchQuery(e.target.value)); 
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Search" 
        onChange={handleSearch}
        className="w-full xl:w-1/4 rounded-2xl p-3 border border-gray-300 mb-6 focus:outline-none" 
      />
    </div>
  );
};

export default SearchBar;
