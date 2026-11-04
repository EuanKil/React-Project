// Import link helper for FAQ navigation.
import { Link } from 'react-router-dom';

// Function component: FormButtons.
function FormButtons() {
  // Component UI: HTML rendering.
  return (
    <>
      <input type="submit" className="btn me-3 text-dark bg-white" style={{ width: '5em' }} value="SUBMIT" />
      <input type="reset" className="btn me-3 text-dark bg-white" style={{ width: '5em' }} value="RESET" />
      <Link to="/faq">
        <input type="button" className="btn me-3 text-dark bg-white" style={{ width: '5em' }} value="FAQ" />
      </Link>
    </>
  );
}

// Export this component so it can be reused across the app.
export default FormButtons;