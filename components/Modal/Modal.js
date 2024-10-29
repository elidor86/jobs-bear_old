import React, { Component } from "react";
import ReactModal from "react-modal";

class Modal extends Component {
  render() {
    const {isOpen, onRequestClose} = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={onRequestClose}
        style={{ 
          overlay: {
            backgroundColor: "rgba(0,6,57, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            height: "100vh"
          },
          content: {
            backgroundColor: "#606FC7",
            borderRadius: "10px",
            border: "none",
            width: "auto",
            inset: "auto",
            padding: 0,
            margin: "16px",
            position: "relative",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal;
