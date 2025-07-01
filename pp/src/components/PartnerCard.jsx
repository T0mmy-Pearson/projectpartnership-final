import React, { useState } from "react";

export default function ProfileCard({ name, role, image, email, bio, linkedin }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="partnersContainer">
        <img className="partnersImg" src={image} alt={name} />
        <div className="profile-card-details">
          <h3 className="partnersName">{name}</h3>
          <h4 className="partnersRole">{role}</h4>
          <div className="partnersEmail">
            <a
              href={`mailto:${email}`}
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              {email}
            </a>
          </div>
        </div>
        <div className="bioLinks">
          <a
            href="#"
            id="bioLink"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            style={{
              marginTop: "0.5rem",
              color: "#fff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Read Bio →
          </a>
          <a href={linkedin} id="linkedinLink">
            <img src="src/imgs/linkedin.svg" alt="LinkedIn" />
          </a>
          </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close biography"
            >
              &times;
            </button>
            <h2>Biography</h2>
            <p>{bio}</p>
          </div>
        </div>
      )}
    </>
  );
}
