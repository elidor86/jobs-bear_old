import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled("div")({
  margin: "0 auto",
  maxWidth: "812px",

  "@media(max-width: 900px)": {
    padding: "0 30px",
  },
});

export default Layout;
