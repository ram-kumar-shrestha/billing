import React from "react";
import {
  FaTachometerAlt,
  FaFileInvoiceDollar,
  FaHistory,
  FaUser,
  FaUsers,
  FaSitemap,
} from "react-icons/fa";

import "./nav-left.css";
import CompanyInfo from "./CompanyInfo";
import NavigationLink from "./NavigationLink";
import { connect } from "react-redux";

import { fetchUser } from "../../actions";

const Index = ({ authUser, fetchUser }) => {
  return (
    <aside className="nav-left">
      <div className="nav-left__container">
        <section className="company-info">
          <CompanyInfo />
        </section>

        <section className="top-left-nav">
          <nav>
            <NavigationLink
              path="/dashboard"
              icon={<FaTachometerAlt />}
              name="Dashboard"
            />

            <NavigationLink
              path="/products/add-a-product"
              icon={<FaSitemap />}
              name="Products"
            />

            <NavigationLink
              path="/create-an-invoice/invoice-form"
              icon={<FaFileInvoiceDollar />}
              name="Create an Invoice"
            />

            <NavigationLink
              path="/history/all"
              icon={<FaHistory />}
              name="History"
            />

            <NavigationLink
              path="/users/add-a-user"
              icon={<FaUsers />}
              name="Users"
            />
          </nav>
        </section>

        <section className="nav-left__bottom">
          <button
            style={{
              width: "100%",
              border: "none",
              fontSize: "1rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              fetchUser(authUser.user._id);
            }}
          >
            <NavigationLink
              path={`/users/update/${authUser.user._id}`}
              name="Profile"
              icon={<FaUser />}
            />
          </button>
        </section>
      </div>
    </aside>
  );
};
const mapStateToProps = (state) => {
  return { authUser: state.authUser };
};
export default connect(mapStateToProps, { fetchUser })(Index);
