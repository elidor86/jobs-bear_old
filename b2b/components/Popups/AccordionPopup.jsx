import React from "react";
import styled from "styled-components";
import Accordion from "../Cards/Accordion";
import { CloseDialogIcon } from "../Icons";

import Popup from "./Popup";

const AccordionPopup = ({ open, handleClose, items, title, app }) => {
  return (
    <Popup open={open} handleClose={handleClose}>
      <Wrapper>
        <CloseButton onClick={handleClose}>
          <CloseDialogIcon />
        </CloseButton>
        <Accordion items={items} title={title} app={app} />
      </Wrapper>
    </Popup>
  );
};

const Wrapper = styled("div")({
  borderRadius: "10px",
  position: "relative",
  width: "354px",

  "& .card-body": {
    background: "#FFBEC6",
  },

  "& .form-heading": {
    padding: "35px 24px 21px",
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: "25px",
    lineHeight: "33px",
  },

  "& .accordion-body": {
    position: "relative",

    "& .background": {
      height: "221px",
    },

    "& .item-content": {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",

      p: {
        fontWeight: 700,
        padding: "20px 0",
      },
    },
  },
});

const CloseButton = styled("button")({
  position: "absolute",
  top: "21px",
  right: "12px",
  border: "none",
  background: "transparent",
  width: "14px",
  height: "14px",
  boxShadow: "none",
  cursor: "pointer",

  "& svg": {
    fill: "rgba(255, 255, 255, 0.38)",
  },
});

export default AccordionPopup;
