import { useState } from 'react';

// Function component: FormCustomerDetail.
function FormCustomerDetail({ passToParent, sendCustomerDetails}) {
  const [customerDetails, setCustomerDetails] = useState({
    customerType: 'consumer',
    title: 'Mr',
    firstName: '',
    lastName: '',
    street: '',
    suburb: '',
    postcode: '',
    phone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedDetails = { ...customerDetails, [name]: value };
    setCustomerDetails(updatedDetails);
    passToParent(updatedDetails);
  };

  // Component UI: HTML rendering.
  return (
    <>
      <h2>Customer Details</h2>

      {/* Customer type selection. */}
      <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
          <legend className="col-11 float-none w-auto">Customer type *</legend>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Consumer</label>
            <input type="radio" name="customerType" value="consumer" defaultChecked onChange={handleChange} required />
          </div>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Business</label>
            <input type="radio" name="customerType" value="business" onChange={handleChange} />
          </div>
        </fieldset>
      </div>

      {/* Customer detail fields. */}
      <div className="row mt-2">
        <label className="col-12 col-md-12 col-lg-4">Title *</label>
        <select className="col-12 col-md-12 col-lg-7" name="title" defaultValue="Mr" onChange={handleChange} required>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">First Name *</label>
        <input className="col-12 col-md-12 col-lg-7" type="text" name="firstName"  pattern="[A-Za-z -]+" title="Use alphabetical characters, spaces and the - symbol only" onChange={handleChange} required />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
        <input className="col-12 col-md-12 col-lg-7" name="lastName" type="text" pattern="[A-Za-z -]+" title="Use alphabetical characters, spaces and the - symbol only" onChange={handleChange} required />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Street *</label>
        <input className="col-12 col-md-12 col-lg-7" name="street" type="text" onChange={handleChange} required />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Suburb</label>
        <input className="col-12 col-md-12 col-lg-7" name="suburb" type="text" onChange={handleChange} />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="postcode">Post code *</label>
        <input id="postcode" className="col-12 col-md-12 col-lg-7" name="postcode" type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength="4" title="Enter exactly 4 numbers" onChange={handleChange} required />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="phone">Phone Number *</label>
        <input id="phone" className="col-12 col-md-12 col-lg-7" name="phone" type="tel" pattern="[0-9 ()+-]+" title="Use numbers, spaces and ( ) - + symbols only" onChange={handleChange} required />
      </div>
    </>
  );
}

// Export this component so it can be reused across the app.
export default FormCustomerDetail;