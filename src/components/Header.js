// Import routing helper for page links.
import { Link } from 'react-router-dom';

// Function component: Header.
function Header() {
  const headerStyle = {
    minHeight: '15vh',
    backgroundColor: '#2C3E50',
  };

  const taglineStyle = {
    minHeight: '15vh',
    backgroundColor: '#2C3E50',
  };

  // Render the top navigation header.
  return (
    <>
      <header className="row site-header" style={headerStyle}>
        <div
          className="col-12 col-md-12 col-lg-8 text-center text-white display-5 site-title"
          style={taglineStyle}
        >
          Phone Fix Booking System
        </div>

        <div className="col-12 col-md-12 col-lg-4">
          <div className="row site-navigation">
            {/* Home navigation button. */}
            <Link
              to="/"
              className="col-12 col-md-6 col-lg-6 p-0 m-0 bg-info border border-dark text-center text-white"
              style={{ textDecoration: 'none' }}
            >
              HOME
            </Link>

            {/* Extension navigation button. */}
            <Link
              to="/advancedjs"
              className="col-12 col-md-6 col-lg-6 p-0 m-0 bg-info border border-dark text-center text-white"
              style={{ textDecoration: 'none' }}
            >
              EXTENSION
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

// Export this component so it can be reused across the app.
export default Header;