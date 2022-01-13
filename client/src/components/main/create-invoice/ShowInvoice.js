import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CompanyInfo from "../../nav-left/CompanyInfo";
import Item from "./Item";
import InvoiceTable from "./InvoiceTable";

import "./create-invoice.css";
import { createHistory, fetchHistories } from "../../../actions";

// let clickedCounter = 0;

const ShowInvoice = (props) => {
  /* eslint-disable no-unused-vars */ //not to throw defined but not used warning
  const [date, setDate] = useState(new Date());
  const componentRef = useRef();

  const invoice_date = date.toLocaleDateString();
  const invoice_time = date.toLocaleTimeString();
  const invoice_no = date.getTime() % 16386317;

  // Company const value
  const PAN = 546749688;
  const company_contact = 9844487985;

  const newHistory = {
    invoiceNo: invoice_no,
    clientName: props.client.name,
    clientPhone: props.client.phone,
    clientOrganization: props.client.organization,
    date: invoice_date,
    time: invoice_time,
    userName: props.name,
    selectedProducts: props.data,
  };

  const afterPrintHandler = () => {
    // if (clickedCounter < 1 || props.client.isEditClient)
    props.createHistory(newHistory); //do not create history if print is clicked twice
    // props.fetchHistories();
    // clickedCounter++;
    // console.log(props.history, clickedCounter);
  };

  return (
    <>
      <div className="invoice-container" ref={componentRef}>
        <section className="invoice-header">
          <div className="top-left__info">
            <div className="company-info__container">
              <CompanyInfo />
              <h5>{company_contact}</h5>
            </div>
          </div>

          <div className="invoice-info">
            <h2>Invoice</h2>
          </div>

          <div className="right-info">
            <Item name="Date:" value={invoice_date} />
            <Item name="Invoice No:" value={invoice_no} />
            <Item name="PAN:" value={PAN} />
          </div>

          <div className="client-info">
            <Item name="Client's Name:" value={props.client.name} />
            <Item name="Contact:" value={props.client.phone} />
            <Item name="Organization:" value={props.client.organization} />
            <Item name="Time:" value={invoice_time} />
          </div>
        </section>

        <hr style={{ borderColor: "#1b1b1b" }} />

        <section className="invoice-table">
          <InvoiceTable items={props.data} products={props.products} />

          <hr style={{ borderColor: "#1b1b1b" }} />

          <div className="remarks">
            <Item name="Signature:" value={""} />
            <Item name="Issued By:" value={props.name} />
          </div>
        </section>
        <hr style={{ borderColor: "#1b1b1b" }} />
      </div>

      <div className="links">
        <button
          className="btn-print"
          onClick={useReactToPrint({
            content: () => componentRef.current,
            onAfterPrint: () => afterPrintHandler(),
          })}
        >
          Print
        </button>
        {/* Btn or link to add more item */}
        <Link
          className="btn btn-invoice"
          to="/create-an-invoice/select-product"
        >
          Add more items
        </Link>

        {/* /* Btn or link to edit client if necessary */}
        <Link className="btn btn-back" to="/create-an-invoice/invoice-form">
          Edit Client Info
        </Link>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    data: state.selectedProducts,
    products: state.products,
    client: state.client,
    history: state.history,
    name: localStorage.getItem("authToken") ? state.authUser.user.name : "",
  };
};

export default connect(mapStateToProps, {
  createHistory,
  fetchHistories,
})(ShowInvoice);
