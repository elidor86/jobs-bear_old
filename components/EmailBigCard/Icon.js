import React, { Component } from "react";
import styled from "styled-components";

const IconOk = styled.svg`
  min-width: 18px;
  position: absolute;
  right: 14px;
  z-index: 9;
  fill: white;
`;

const Icon = () => {
  return (
    <IconOk
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.00016 11.1698L1.83016 6.99984L0.410156 8.40984L6.00016 13.9998L18.0002 1.99984L16.5902 0.589844L6.00016 11.1698Z" />
    </IconOk>
  );
};

export default Icon;
