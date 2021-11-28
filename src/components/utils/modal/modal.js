import { useEffect } from "react";
import "./modal.css";

function Modal() {
  useEffect(() => {
    const modal = document.querySelector("#modal");
    modal.addEventListener("click", (e) => {
      const evTarget = e.target;
      if (evTarget.classList.contains("modal-overlay")) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }, []);

  const closeModal = () => {
    const modal = document.querySelector("#modal");
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  return (
    <div className="modal-overlay" id="modal">
      <div className="modal-window">
        <div className="modal-title">접근 불가!</div>
        <div className="modal-content"> 로그인이 필요해요! </div>
        <div className="ok-container">
          <div className="ok-button" onClick={closeModal}>
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
