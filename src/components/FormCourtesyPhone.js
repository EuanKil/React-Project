// Import state hook for courtesy phone selection.
import { useState } from 'react';

// Function component: FormCourtesyPhone.
function FormCourtesyPhone( {passDataToParent}) {
  // Assume there is a list of courtesy items.
  let courtesyList = [
{id: 0, type: 'none', name: 'none', bond: 0},    
{id: 1, type: 'phone', name: 'iphone 10', bond: 275},
{id: 2, type: 'phone', name: 'iphone 14', bond: 300},
{id: 3, type: 'phone', name: 'iphone 16', bond: 500},
{id: 4, type: 'phone', name: 'samsung galaxy', bond: 200},
{id: 5, type: 'phone', name: 'nokia', bond: 150},
{id: 6, type: 'phone', name: 'xiaomi', bond: 100},
{id: 7, type: 'charger', name: 'iphone charger', bond: 45},
{id: 8, type: 'charger', name: 'samsung charger', bond: 30},
{id: 9, type: 'charger', name: 'nokia charger', bond: 25},
{id: 10, type: 'charger', name: 'xiaomi', bond: 25}
];

  // Declare state: selected courtesy items.
  const [phoneBorrow, setPhoneBorrow] = useState(0);
  const [chargerBorrow, setChargerBorrow] = useState(0);

  const updateParent = (phone, charger) => {
    const phoneItem = courtesyList.find(item => item.id === phone);
    const chargerItem = courtesyList.find(item => item.id === charger);
    passDataToParent({
      phone,
      charger,
      bond: phoneItem.bond + chargerItem.bond
    });
  };

  //Handle 'onChange' event
  let addPhone = (selectedOption) => {
    const updateID = selectedOption === 'none' ? 0 : Number(selectedOption);
    setPhoneBorrow(updateID);
    updateParent(updateID, chargerBorrow);
  }

  let addCharger = (selectedOption) => {
    const updateID = selectedOption === 'none' ? 0 : Number(selectedOption);
    setChargerBorrow(updateID);
    updateParent(phoneBorrow, updateID);
  }

  // Component UI: HTML rendering.
  return (
    <>
      <h2>Courtesy Phone</h2>

      {/* Phone item types. */}
      <h4 className="ms-4 mt-2">Choose a phone</h4>
      <div className="row mt-2 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Item Type</label>
        <select className="col-12 col-md-12 col-lg-7" defaultValue="none" onChange={(event) => addPhone(event.target.value)}>
          <option value="none">None</option>
          {courtesyList.filter((item) => item.type === 'phone').map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* Charger item types. */}
      <h4 className="ms-4 mt-2">Choose a charger</h4>
      <div className="row mt-2 ms-3">
        <label className="col-12 col-md-12 col-lg-4">Item Type</label>
        <select className="col-12 col-md-12 col-lg-7" defaultValue="none" onChange={(event) => addCharger(event.target.value)}>
          <option value="none">None</option>
          {courtesyList.filter((item) => item.type === 'charger').map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* Table showing the selected courtesy item. */}
      <div className="row mt-2 ms-3 me-3 bg-white responsive-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {[phoneBorrow, chargerBorrow].filter((itemId) => itemId !== 0).map((itemId) => {
              const item = courtesyList.find((courtesyItem) => courtesyItem.id === itemId);

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.bond}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Export this component so it can be reused across the app.
export default FormCourtesyPhone;