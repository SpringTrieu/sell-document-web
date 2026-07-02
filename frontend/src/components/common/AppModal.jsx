// frontend/src/components/common

import "./AppModal.css";

function AppModal({
  show,
  title,
  message,
  buttonText = "Đồng ý",
  cancelText,
  icon,
  iconType,
  onClose,
  onConfirm,
  onCancel,
}) {
  if (!show) return null;

  return (
    <div className="app-modal-overlay">
      <div className="app-modal-box">
        {icon && (
  <div className={`app-modal-icon app-modal-icon--${iconType || "info"}`}>
    <i className={icon}></i>
  </div>
)}

        <h3>{title}</h3>

        <p>{message}</p>

        <div className="app-modal-actions">
  {cancelText && (
    <button
      type="button"
      className="app-modal-btn app-modal-btn--secondary"
      onClick={onCancel}
    >
      {cancelText}
    </button>
  )}

  <button
    type="button"
    className="app-modal-btn"
    onClick={onConfirm || onClose}
  >
    {buttonText}
  </button>
</div>
      </div>
    </div>
  );
}

export default AppModal;