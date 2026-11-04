import { useState } from 'react';

// Function component: FormRepairDetail.
function FormRepairDetail( {passToParent}) {
  const today = new Date();
  const todayValue = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().slice(0, 10);
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString().slice(0, 10);
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().slice(0, 10);
  const [repairDetails, setRepairDetails] = useState({
    purchaseDate: '',
    repairDate: '',
    warranty: false,
    imei: '',
    make: '',
    faultCategory: ''
  });
  const warrantyExpired = repairDetails.purchaseDate !== '' && new Date(`${repairDetails.purchaseDate}T00:00:00`) < new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());

  const updateRepairDetails = (name, value) => {
    const updatedDetails = { ...repairDetails, [name]: value };
    setRepairDetails(updatedDetails);
    passToParent(updatedDetails);
  };

  const handleRepairDateChange = (event) => {
    const value = event.target.value;
    updateRepairDetails('repairDate', value);
    event.target.setCustomValidity(
      value && (value <= repairDetails.purchaseDate || value <= todayValue)
        ? 'Repair date must be after today and later than the purchase date.'
        : ''
    );
  };

  // Component UI: HTML rendering.
  return (
    <>
      <h2>Repair Details</h2>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="purchase-date">Purchase Date *</label>
        <input id="purchase-date" className="col-12 col-md-12 col-lg-7" name="purchaseDate" type="date" max={yesterday} value={repairDetails.purchaseDate} onChange={(event) => updateRepairDetails('purchaseDate', event.target.value)} required />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="repair-date">Repair Date *</label>
        <input id="repair-date" className="col-12 col-md-12 col-lg-7" name="repairDate" type="date" min={tomorrow} value={repairDetails.repairDate} onChange={handleRepairDateChange} required />
      </div>

      {/* Under warranty section. */}
      <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
          <legend className="col-11 float-none w-auto">Under Warranty</legend>
          <div>
            <label className="col-12 col-md-12 col-lg-4">Warranty</label>
            <input type="checkbox" id="warranty" checked={repairDetails.warranty} onChange={(event) => updateRepairDetails('warranty', event.target.checked)} disabled={warrantyExpired} />
          </div>
        </fieldset>
      </div>

      {/* Other details. */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="imei">IMEI *</label>
        <input id="imei" className="col-12 col-md-12 col-lg-7" name="imei" type="text" inputMode="numeric" pattern="[0-9]{15}" maxLength="15" title="Enter exactly 15 numbers" value={repairDetails.imei} onChange={(event) => updateRepairDetails('imei', event.target.value)} required />
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="make">Make *</label>
        <select id="make" className="col-12 col-md-12 col-lg-7" name="make" value={repairDetails.make} onChange={(event) => updateRepairDetails('make', event.target.value)} required>
          <option value="" disabled>Select make</option>
          <option>Apple</option>
          <option>LG</option>
          <option>Motorola</option>
          <option>Nokia</option>
          <option>Samsung</option>
          <option>Sony</option>
          <option>Other</option>
        </select>
      </div>
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4" htmlFor="fault-category">Fault Category *</label>
        <select id="fault-category" className="col-12 col-md-12 col-lg-7" name="faultCategory" value={repairDetails.faultCategory} onChange={(event) => updateRepairDetails('faultCategory', event.target.value)} required>
          <option value="" disabled>Select fault category</option>
          <option>Battery</option>
          <option>Charging</option>
          <option>Screen</option>
          <option>SD-storage</option>
          <option>Software</option>
          <option>Other</option>
        </select>
      </div>
    </>
  );
}

// Export this component to the entire app so it can be reused or hooked into other components.
export default FormRepairDetail;