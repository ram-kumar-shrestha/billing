import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  fetchHistory,
  fetchHistories,
  fetchProducts,
  deleteHistory,
} from "../../../actions";

const Index = (props) => {
  const showClickHandler = (id) => {
    props.fetchHistory(id);
    if (props.products.length === 0) props.fetchProducts();
  };
  const deleteClickHandler = (id) => {
    props.deleteHistory(id);
  };

  // redering loading
  const loading = () => {
    props.fetchHistories();
    return <div>Loading... </div>;
  };

  // fetch history if the history state is either empty array or not an array at all
  if (
    !(Object.prototype.toString.call(props.histories) === "[object Array]") ||
    props.histories.length === 0
  ) {
    return loading();
  }

  const historyList = props.histories.map((history, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{history.clientName}</td>
        <td>{history.invoiceNo}</td>
        <td>{history.date}</td>
        <td>{history.userName}</td>
        <td>
          <Link
            className="link edit"
            to={`/history/show/${history._id}`}
            onClick={(e) => showClickHandler(history._id)}
          >
            {<FaRegEye />}
          </Link>
        </td>
        <td>
          <Link
            className="link delete"
            to={`/history/all`}
            onClick={(e) => deleteClickHandler(history._id)}
          >
            {<AiFillDelete />}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <section className="invoice-container">
      <h1 className="title">History</h1>

      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Client Name</th>
            <th>Invoice Number</th>
            <th>Date</th>
            <th>Issued By</th>
            <th>View History</th>
            <th>Delete History</th>
          </tr>
        </thead>

        <tbody>{historyList}</tbody>
      </table>
    </section>
  );
};

const mapToStateToProps = (state) => {
  //   console.log(state);
  return { histories: state.history, products: state.products };
};
export default connect(mapToStateToProps, {
  fetchHistories,
  fetchHistory,
  fetchProducts,
  deleteHistory,
})(Index);
