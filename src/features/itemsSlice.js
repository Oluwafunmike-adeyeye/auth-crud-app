import { createSlice } from "@reduxjs/toolkit";

// Initial state of the items slice
const initialState = {
  items: [], 
  searchQuery: "", 
};

const itemsSlice = createSlice({
  name: "items", 
  initialState, 
  reducers: {
    // Action to set the list of items
    setItems: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : []; 
    },

    // Action to add a new item
    addItem: (state, action) => {
      const newItem = action.payload;
      if (newItem && newItem.id && newItem.name) {
        state.items.push(newItem); 
      } else {
        console.error("Invalid item:", newItem); 
      }
    },

    // Action to update an existing item
    updateItem: (state, action) => {
      const { id, name, description } = action.payload;
      const item = state.items.find((item) => item.id === id); 
      
      if (item) {
        if (name) item.name = name; 
        if (description) item.description = description; 
      } else {
        console.error("Item not found or invalid update data:", action.payload); 
      }
    },

    // Action to delete an item by id
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id); 
    },

    // Action to set the search query
    setSearchQuery: (state, action) => {
      state.searchQuery = typeof action.payload === "string" ? action.payload : ""; 
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem, setSearchQuery } =
  itemsSlice.actions;

export default itemsSlice.reducer;
