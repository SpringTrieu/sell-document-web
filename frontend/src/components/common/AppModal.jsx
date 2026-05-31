// frontend/src/components/common

import "./AppModal.css";

function AppModal({
  show,
  title,
  message,
  buttonText = "Đồng ý",
  onClose,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div className="app-modal-overlay">
      <div className="app-modal-box">
        <div className="app-modal-icon">
          <i className="bi bi-check-lg"></i>
        </div>

        <h3>{title}</h3>

        <p>{message}</p>

        <button
          type="button"
          className="app-modal-btn"
          onClick={onConfirm || onClose}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default AppModal;