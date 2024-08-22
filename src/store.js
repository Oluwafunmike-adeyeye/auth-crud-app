import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import itemsReducer from "./features/itemsSlice";

// Configuring the Redux store
const store = configureStore({
  reducer: {
    // Reducer for managing authentication state
    auth: authReducer,
    // Reducer for managing items state
    items: itemsReducer,
  },
});

export default store;
