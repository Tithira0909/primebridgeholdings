import React from 'react';

const Terms = () => {
  return (
    <div className="legal-page animate-fade-in">
      <header className="page-header text-center" style={{ background: "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/legal-bg.jpg') center/cover no-repeat", padding: '6rem 0 4rem', marginBottom: '3rem' }}>
        <div className="container">
          <h1>Terms and Conditions</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Effective Date: May 1, 2024 | Last Updated: May 1, 2024</p>
        </div>
      </header>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: 'var(--color-bg)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>

        <h3 style={{ marginTop: '2rem' }}>1. Acceptance of Terms</h3>
        <p>
          By accessing or using any part of this website or any services provided by PrimeBridge Holdings or its subsidiaries — PrimeBridge Corporate Services, PrimeBridge Solutions, and PrimeBridge Talent Management — you confirm that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy. If you do not agree, please discontinue use of our website and services immediately.
        </p>

        <h3 style={{ marginTop: '2rem' }}>2. Services</h3>
        <p>
          PrimeBridge Holdings operates as a parent company with three subsidiary entities, each providing distinct professional services. The specific terms governing individual service engagements — including scope, deliverables, timelines, and fees — will be set out in a separate service agreement or engagement letter issued to the client prior to commencement of services.
        </p>

        <h3 style={{ marginTop: '2rem' }}>3. Use of Website</h3>
        <p>
          You agree to use this website for lawful purposes only. You must not use the website in any way that causes, or may cause, damage to the website or impairment of its availability, or in any way that is unlawful, fraudulent, harmful, or in connection with any unlawful or fraudulent purpose. Unauthorised use of this website may give rise to a claim for damages and/or constitute a criminal offence.
        </p>

        <h3 style={{ marginTop: '2rem' }}>4. Intellectual Property</h3>
        <p>
          All content on this website — including but not limited to text, graphics, logos, images, and software — is the property of PrimeBridge Holdings or its subsidiaries and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content from this website without our prior written consent.
        </p>

        <h3 style={{ marginTop: '2rem' }}>5. Confidentiality</h3>
        <p>
          Any information shared with PrimeBridge Holdings or its subsidiaries during a service engagement will be treated as strictly confidential. We will not disclose client information to third parties without prior written consent, except where required by law or regulatory authority.
        </p>

        <h3 style={{ marginTop: '2rem' }}>6. Limitation of Liability</h3>
        <p>
          While we strive to ensure the accuracy and reliability of the information and services we provide, PrimeBridge Holdings and its subsidiaries shall not be held liable for any indirect, incidental, or consequential loss or damage arising from the use of our website or services, except where such liability cannot be excluded by applicable law.
        </p>

        <h3 style={{ marginTop: '2rem' }}>7. Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites for your convenience. PrimeBridge Holdings does not endorse or take responsibility for the content, privacy practices, or services of any linked third-party websites. Accessing such links is at your own risk.
        </p>

        <h3 style={{ marginTop: '2rem' }}>8. Amendments</h3>
        <p>
          PrimeBridge Holdings reserves the right to amend these Terms and Conditions at any time. Changes will be published on this page with an updated effective date. Your continued use of our website following any changes constitutes your acceptance of the revised Terms.
        </p>

        <h3 style={{ marginTop: '2rem' }}>9. Governing Law</h3>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
        </p>

        <h3 style={{ marginTop: '2rem' }}>10. Contact Us</h3>
        <p>
          If you have any questions regarding these Terms and Conditions, please contact us at:<br/>
          info@primebridgeholdings.com | +94 11 234 5678 | 123 Business Avenue, Colombo 03, Sri Lanka
        </p>
      </div>
    </div>
  );
};

export default Terms;
