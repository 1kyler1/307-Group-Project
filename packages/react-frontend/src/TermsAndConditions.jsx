// src/TermsAndConditions.jsx
import React from "react";
import "./TermsAndConditions.css";

export default function TermsAndConditions({ onAccept, onDecline }) {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">
          Terms and Conditions
        </h1>
        
        <div className="terms-text-container">
          <p className="terms-date">Last updated: 11/19/2025</p>
          
          <div className="terms-divider">
            <h2 className="terms-divider-title">1. Acceptance of Terms</h2>
            <p className="terms-divider-text">
              By creating an account, you agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not create an account.
            </p>
          </div>

          <div className="terms-divider">
            <h2 className="terms-divider-title">2. User Accounts</h2>
            <p className="terms-divider-text">
              You are responsible for maintaining accurate and up to date information in your account.
            </p>
          </div>

          <div className="terms-divider">
            <h2 className="terms-divider-title">3. User Conduct</h2>
            <p className="terms-divider-text">
              You agree not to use the service for any unlawful purpose or in any way that could 
              damage, disable, or impair the service. You are responsible for all content you post.
            </p>
          </div>

          <div className="terms-divider">
            <h2 className="terms-divider-title">4. Listing Items</h2>
            <p className="terms-divider-text">
              When listing items, you must provide accurate descriptions and images. You are 
              responsible for the accuracy of all information provided in your listings.
            </p>
          </div>

          <div className="terms-divider">
            <h2 className="terms-divider-title">5. Meeting Up With Other Users</h2>
            <p className="terms-divider-text">
              SLOFits is not responsible for any interactions between users. It is up to the users to 
              decide how to meet up with each other. SLOFits recommends meeting up in a public place and to always be cautious.
            </p>
          </div>

          <div className="terms-divider">
            <h2 className="terms-divider-title">7. Changes to Terms</h2>
            <p className="terms-divider-text">
              We reserve the right to modify these terms at any time.
            </p>
          </div>
        </div>

        <div className="terms-buttons">
          <button
            onClick={onDecline}
            className="terms-button terms-button-decline"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="terms-button terms-button-accept"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}

