import React, { useEffect, useRef, useState } from "react";

const Modal = ({
  children,
  onClose,
  isModal,
  setIsModal,
  className,
  showCloseButton = false,
  disableOutsideClick,
}) => {
  const modalRef = useRef(null);
  const closeRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isModal) setShowModal(true);
  }, [isModal]);
  useEffect(() => {
    if (closeRef && showModal) closeRef.current.focus();
  }, [closeRef, showModal]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !disableOutsideClick
      ) {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    isModal && (
      <div
        className={`
        w100vw h100vh fixed top-1/2 left-1/2 z-50234 flex justify-center items-center  bg-black transition-all duration-300
        ${isModal && "visible"}
`}
        ref={closeRef}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div
          className={`
          fixed bg-white outline-none z-50235 rounded-lg overflow-hidden shadow-lg
          p-2 ${isModal ? "keyframes-animateIn" : ""} ${className}`}
          ref={modalRef}
        >
          {showCloseButton && (
            <button
              className={`
absolute top-2 right-2 w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300   `}
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
