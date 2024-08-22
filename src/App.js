import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ItemForm from "./components/ItemForm";
import ItemDetails from "./components/ItemDetails";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/items/create" element={<PrivateRoute element={<ItemForm />} />} />
      <Route path="/items/edit/:id" element={<PrivateRoute element={<ItemForm />} />} />
      <Route path="/items/:id" element={<PrivateRoute element={<ItemDetails />} />} />
    </Routes>
  );
};

export default App;
