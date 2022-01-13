import { Component } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import "./main.css";

import Dashboard from "./dashboard";
import Products from "./products";
import ViewAllHistory from "./history";
import Users from "./users/";
import InvoiceForm from "./create-invoice/InvoiceForm";
import ProductItemForm from "./create-invoice/ProductItemForm";
import AddProductForm from "./products/AddProduct";
import ViewAllProducts from "./products/ViewAllProducts";
import UpdateProduct from "./products/UpdateProduct";

import AddUserForm from "./users/AddUserForm";
import ViewAllUsers from "./users/ViewAllUsers";
import UpdateUser from "./users/UpdateUser";

import ShowInvoice from "./create-invoice/ShowInvoice";
import ShowHistory from "./history/ShowHistory";

class Index extends Component {
  render() {
    return (
      <main>
        <section className="main-body">
          <Routes>
            <Route path="/dashboard/" element={<Dashboard />}></Route>

            <Route path="/products/" element={<Products />}>
              <Route path="view-all-product" element={<ViewAllProducts />} />
              <Route path="add-a-product" element={<AddProductForm />} />
              <Route path="delete/:id" element={<ViewAllProducts />} />
              <Route path="update/:id" element={<UpdateProduct />} />
            </Route>

            <Route
              path="/create-an-invoice"
              element={<Outlet name={"outlet-container"} />}
            >
              <Route path="invoice-form" element={<InvoiceForm />} />
              <Route path="select-product" element={<ProductItemForm />} />
              <Route path="show-invoice" element={<ShowInvoice />} />
            </Route>

            <Route path="/history" element={<Outlet />}>
              <Route path="all" element={<ViewAllHistory />} />
              <Route path="show/:id" element={<ShowHistory />} />
            </Route>

            <Route path="/users/" element={<Users />}>
              <Route path="view-all-users" element={<ViewAllUsers />} />
              <Route path="add-a-user" element={<AddUserForm />} />
              <Route path="delete/:id" element={<ViewAllUsers />} />
              <Route path="update/:id" element={<UpdateUser />} />
            </Route>
          </Routes>
        </section>
      </main>
    );
  }
}

export default Index;
