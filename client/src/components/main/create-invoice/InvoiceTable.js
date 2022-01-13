const InvoiceTable = (props) => {
  let total_sum = 0;

  const items = props.items.map((item, index) => {
    const product = props.products.find(
      (product) => product.name.toLowerCase() === item.name.toLowerCase()
    );
    const rate = parseInt(product.rate);
    const amount = item.quantity * rate;
    total_sum += amount;
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{rate}</td>
        <td>{amount}</td>
      </tr>
    );
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Partcular (s)</th>
            <th>Qty</th>
            <th>Rate (Rs.)</th>
            <th>Amount (Rs.)</th>
          </tr>
        </thead>

        <tbody>{items}</tbody>

        <tfoot>
          <tr className="total-sum__row">
            <td colSpan="5" className="total-sum">
              Total Amount: Rs. {total_sum}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default InvoiceTable;
