import React from "react";
import styled from "styled-components";

const Popup = ({ open, handleClose, children }) => {
  return (
    <Wrapper open={open}>
      <Content>{children}</Content>
      <Cover onClick={handleClose} />
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ open }) => ({
  position: "fixed",
  zIndex: 10,
  top: 0,
  left: 0,
  minWidth: "100%",
  minHeight: "100%",
  display: open ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
}));

const Content = styled("div")({
  position: "relative",
  zIndex: 20,
  display: "flex",
  justifyContent: "center",
});

const Cover = styled("div")({
  position: "fixed",
  zIndex: 10,
  background: "rgba(0, 0, 0, 0.6)",
  minHeight: "100%",
  width: "100%",
});

export default Popup;
