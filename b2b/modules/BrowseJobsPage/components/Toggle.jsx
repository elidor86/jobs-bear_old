import Button from "../../../components/Button/Button";
import React, { useState } from "react";
import styled from "styled-components";

const buttons = [
  {
    title: "By location",
    id: "byLocation",
  },
  {
    title: "By Job Title",
    id: "byJobTitle",
  },
  {
    title: "By Job Title",
    id: "byCategory",
  },
];

const Toggle = () => {
  const [active, setActive] = useState("byLocation");
  const handleChange = (e) => setActive(e);
  return (
    <Wrapper>
      {buttons.map(({ title, id }) => (
        <Button active={active === id} onClick={() => handleChange(id)} variant="rounded" key={id} id={id}>
          {title}
        </Button>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  gap: "27px",
  "@media(max-width: 750px)": {
    gap: "10px",
  },
});

export default Toggle;
