// Function component: FormCost.
function FormCost( props ) {
  const bond = props.sharedPropCustomerType === 'consumer' ? props.sharedPropBond : 0;
  const serviceFee = props.sharedPropWarranty ? 0 : 85;
  const total = bond + serviceFee;
  const gst = total * 0.15;

  // Component UI: HTML rendering.
  return (
    <>
      <h2>Cost</h2>
      <div className="row mt-2 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
        <input className="col-12 col-md-12 col-lg-7" type="number" value={props.sharedPropBond} readOnly />
      </div>
      <div className="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
        <input className="col-12 col-md-12 col-lg-7" type="number" value={props.sharedPropWarranty ? 0 : 85} readOnly />
      </div>
      <div className="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
        <input className="col-12 col-md-12 col-lg-7" type="number" value={total.toFixed(2)} readOnly />
      </div>
      <div className="row mt-1 ms-3">
        <label className="col-12 col-md-12 col-lg-4">GST ($)</label>
        <input className="col-12 col-md-12 col-lg-7" type="number" value={gst.toFixed(2)} readOnly />
      </div>
    </>
  );
}

// Export this component to the entire app so it can be reused or hooked into other components.
export default FormCost;