// Import all dependencies and child components.
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './SupabaseClient';

// Main booking form page component.
function Home() {
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

  const [repairDetails, setRepairDetails] = useState({
    purchaseDate: '',
    repairDate: '',
    warranty: false,
    imei: '',
    make: '',
    faultCategory: ''
  });
  const [courtesyPhone, setCourtesyPhone] = useState({
    phone: 0,
    charger: 0,
    bond: 0
  });
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError('');
    setIsSubmitting(true);

    try {
      const bookingData = {
        customertype: customerDetails.customerType,
        title: customerDetails.title,
        first_name: customerDetails.firstName,
        last_name: customerDetails.lastName,
        bond: customerDetails.customerType === 'consumer' ? courtesyPhone.bond : 0,
        service: repairDetails.warranty ? 0 : 85
      };

      const { error } = await supabase.from('bookings').insert([bookingData]);

      if (error) {
        throw error;
      }

      alert('Thanks for your submission!');
      navigate('/bookings');
    } catch (error) {
      setSubmissionError(`Unable to save booking: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Component UI: HTML rendering.
  return (
    <>
      <form className="row booking-form" onSubmit={onSubmit}>
        {/* Customer details section. */}
        <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
          <FormCustomerDetail passToParent={setCustomerDetails} />
        </div>

        {/* Repair details section. */}
        <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5F5E3' }}>
          <FormRepairDetail passToParent={setRepairDetails} />
        </div>

        {/* Courtesy phone and cost section. */}
        <div className="col-12 col-lg-4 p-0 m-0">
          {/* Courtesy phone area. */}
          <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
            <FormCourtesyPhone passDataToParent={setCourtesyPhone} />
          </div>

          {/* Cost area. */}
          <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
              <FormCost sharedPropBond={courtesyPhone.bond} sharedPropWarranty={repairDetails.warranty} sharedPropCustomerType={customerDetails.customerType} />
          </div>
        </div>

        {/* Button area. */}
        <div className="p-4 text-center form-actions" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}>
          {submissionError && <p role="alert" style={{ color: 'darkred' }}>{submissionError}</p>}
          {isSubmitting && <p aria-live="polite">Saving booking...</p>}
          <FormButtons />
        </div>
      </form>
    </>
  );
}

// Export this component to the entire app so it can be reused or hooked into other components.
export default Home;