import { useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

export const MODAL_ANIMATION_STYLES = {
  FADE: "fade",
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  ZOOM: "zoom",
};

const Modal = ({
  open,
  title,
  children,
  footer,
  okText = "Ok",
  cancelText = "Cancel",
  onOk = () => {},
  onCancel = () => {},
  lock = false,
  animation = MODAL_ANIMATION_STYLES.FADE,
  ...props
}) => {
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) {
    return;
  }

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    if (!lock && e.currentTarget === e.target) {
      onCancel();
    }
  };

  const renderFooter = () => {
    if (footer === null) {
      return;
    }
    if (footer) {
      return typeof footer === "function" ? footer() : footer;
    }
    return (
      <div id="modal-footer" className="modal-footer">
        <button onClick={onOk}>{okText}</button>
        <button onClick={onCancel}>{cancelText}</button>
      </div>
    );
  };

  return createPortal(
    <div
      className="modal-container"
      aria-hidden={open ? "false" : "true"}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      {...props}
      onClick={handleBackdropClick}
    >
      <div className={`modal animate-${animation}`}>
        <h3 id="modal-title" tabIndex={0}>
          {title}
        </h3>
        <div id="modal-content" className="modal-content">
          {children}
        </div>
        {renderFooter()}
      </div>
    </div>,
    el
  );
};

export default Modal;
