import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";

import CompanyInfo from "../../nav-left/CompanyInfo";
import Item from "../create-invoice/Item";
import InvoiceTable from "../create-invoice/InvoiceTable";
import { fetchHistories } from "../../../actions";

const PAN = 546749688;
const company_contact = 9844487985;

const ShowInvoice = ({ history, products, fetchHistories }) => {
  const componentRef = useRef();

  // redering loading
  const loading = () => {
    history.length === 0 ? <div>No Data Found... </div> : <div>Loading...</div>;
  };

  const historyTable =
    Object.prototype.toString.call(history) === "[object Array]" ||
    products.length === 0 ? (
      loading()
    ) : (
      <InvoiceTable items={history.selectedProducts} products={products} />
    );
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
            <Item name="Date:" value={history.date} />
            <Item name="Invoice No:" value={history.invoiceNo} />
            <Item name="PAN:" value={PAN} />
          </div>

          <div className="client-info">
            <Item name="Client's Name:" value={history.clientName} />
            <Item name="Contact:" value={history.clientPhone} />
            <Item name="Organization:" value={history.clientOrganization} />
            <Item name="Time:" value={history.time} />
          </div>
        </section>
        <hr style={{ borderColor: "#1b1b1b" }} />
        <section className="invoice-table">
          {historyTable}

          <hr style={{ borderColor: "#1b1b1b" }} />

          <div className="remarks">
            <Item name="Signature:" value={""} />
            <Item name="Issued By:" value={history.userName} />
          </div>
        </section>
        <hr style={{ borderColor: "#1b1b1b" }} />
      </div>

      <div className="links">
        <button
          className="btn-print"
          onClick={useReactToPrint({ content: () => componentRef.current })}
        >
          Print
        </button>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state.products);
  return {
    history: state.history,
    products: state.products,
  };
};

export default connect(mapStateToProps, { fetchHistories })(ShowInvoice);
