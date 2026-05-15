import React from 'react';

const Privacy = () => {
  return (
    <div className="legal-page animate-fade-in">
      <header className="page-header text-center" style={{ background: "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/legal-bg.jpg') center/cover no-repeat", padding: '6rem 0 4rem', marginBottom: '3rem' }}>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Effective Date: May 1, 2024 | Last Updated: May 1, 2024</p>
        </div>
      </header>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: 'var(--color-bg)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>

        <p>
          PrimeBridge Holdings and its subsidiaries are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or engage with our services.
        </p>

        <h3 style={{ marginTop: '2rem' }}>1. Information We Collect</h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li><strong>Personal identification information:</strong> Name, email address, phone number, and postal address provided voluntarily through contact or enquiry forms.</li>
          <li><strong>Business information:</strong> Company name, registration details, and financial information shared during service engagements.</li>
          <li><strong>Technical data:</strong> IP address, browser type, operating system, and pages visited, collected automatically via cookies and analytics tools.</li>
          <li><strong>Communication records:</strong> Emails, messages, and other correspondence with our team.</li>
        </ul>

        <h3 style={{ marginTop: '2rem' }}>2. How We Use Your Information</h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Respond to enquiries and communicate about our services.</li>
          <li>Deliver and manage the services you have engaged us for.</li>
          <li>Send service-related updates, invoices, and important notices.</li>
          <li>Improve the functionality and user experience of our website.</li>
          <li>Comply with legal and regulatory obligations.</li>
          <li>Prevent fraud and ensure the security of our systems.</li>
        </ul>

        <h3 style={{ marginTop: '2rem' }}>3. Legal Basis for Processing</h3>
        <p>
          We process your personal data on the following legal grounds:<br/>
          - Contractual necessity to fulfil our service obligations to you.<br/>
          - Legitimate interests to operate and improve our business.<br/>
          - Legal compliance to meet our obligations under Sri Lankan law.<br/>
          - Consent where you have explicitly agreed to receive marketing communications.
        </p>

        <h3 style={{ marginTop: '2rem' }}>4. Sharing of Information</h3>
        <p>
          We do not sell, rent, or trade your personal information. We may share your data with trusted third-party service providers bound by strict confidentiality agreements, regulatory authorities where required by law, or professional advisors.
        </p>

        <h3 style={{ marginTop: '2rem' }}>5. Data Retention</h3>
        <p>
          We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable laws and regulations. When data is no longer required, it is securely deleted or anonymised.
        </p>

        <h3 style={{ marginTop: '2rem' }}>6. Security of Your Data</h3>
        <p>
          We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. While we take data security seriously, no method of transmission over the internet is entirely secure.
        </p>

        <h3 style={{ marginTop: '2rem' }}>7. Cookies</h3>
        <p>
          Our website uses cookies to enhance your browsing experience and gather analytical data. You may control cookie preferences through your browser settings. Please note that disabling cookies may affect website functionality.
        </p>

        <h3 style={{ marginTop: '2rem' }}>8. Your Rights</h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate or incomplete information.</li>
          <li>Request deletion of your personal data, subject to legal obligations.</li>
          <li>Withdraw consent to marketing communications at any time.</li>
          <li>Lodge a complaint with the relevant regulatory authority.</li>
        </ul>

        <h3 style={{ marginTop: '2rem' }}>9. Children's Privacy</h3>
        <p>
          Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors.
        </p>

        <h3 style={{ marginTop: '2rem' }}>10. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
        </p>

        <h3 style={{ marginTop: '2rem' }}>11. Contact Us</h3>
        <p>
          If you have any questions regarding this Privacy Policy, please contact our Data Protection Officer at:<br/>
          info@primebridgeholdings.com | +94 11 234 5678 | 123 Business Avenue, Colombo 03, Sri Lanka
        </p>
      </div>
    </div>
  );
};

export default Privacy;
