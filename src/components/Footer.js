// Function component: Footer.
function Footer() {
  const footerStyle = {
    minHeight: '10vh',
    fontSize: '1.2em',
    color: 'white',
    backgroundColor: '#2C3E50',
    /* Center the content both vertically and horizontally. */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Component UI: HTML rendering.
  return (
    <>
      <footer style={footerStyle}>
        <p className="text-center">Advanced Web App Dev. @2026</p>
      </footer>
    </>
  );
}

// Export this component so it can be reused across the app.
export default Footer;