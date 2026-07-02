import { useEffect, useState } from "react";
import "../../styles/pages/account/my-account.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function VerifyEmail() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [code, setCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleSendCode = async () => {
  if (isSendingCode) return;

  setIsSendingCode(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/send-verification-code",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Gửi mã thất bại");
      return;
    }

    setCodeSent(true);
    setCountdown(40);
    alert(result.message);
  } catch (error) {
    console.error(error);
    alert("Không thể kết nối server");
  } finally {
    setIsSendingCode(false);
  }
};

  const handleVerifyCode = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/verify-email",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      }
    );

    const result = await response.json();

    console.log("VERIFY EMAIL:", result);

    if (!response.ok || !result.success) {
      alert(result.message || "Xác thực thất bại");
      return;
    }

    setUser(result.user);

alert("Xác thực email thành công");

navigate("/my-account");
  } catch (error) {
    console.error(error);
    alert("Không thể kết nối server");
  }
};

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <main className="verify-email-page">
      <div className="verify-email-card">
        <div className="verify-email-icon">
          <i className="bi bi-envelope-check"></i>
        </div>

        <h1>Xác thực email</h1>

        <p>
          Chúng tôi sẽ gửi mã xác thực đến email của bạn. Mã có hiệu lực trong
          40 giây.
        </p>

        {!codeSent ? (
          <button
  type="button"
  className="btn btn-primary"
  onClick={handleSendCode}
  disabled={isSendingCode}
>
  {isSendingCode ? (
    <>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      Mã đang được gửi tới...
    </>
  ) : (
    "Gửi mã xác thực"
  )}
</button>
        ) : (
          <div className="verify-email-form">
            <input
              type="text"
              className="form-field__input verify-email-input"
              placeholder="Nhập mã xác thực"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="verify-email-resend">
              {countdown > 0 ? (
                <span>Gửi lại mã sau {countdown}s</span>
              ) : (
                <button
  type="button"
  onClick={handleSendCode}
  disabled={isSendingCode}
>
  {isSendingCode ? "Đang gửi..." : "Gửi lại mã"}
</button>
              )}
            </div>

            <button type="button" className="btn btn-primary" onClick={handleVerifyCode}>
              Xác thực
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default VerifyEmail;