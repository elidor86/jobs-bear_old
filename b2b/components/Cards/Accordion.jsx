import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ArrowUp } from "../../components/Icons/ArrowUp";
import { ArrowDown } from "../../components/Icons/ArrowDown";

const Accordion = ({ items, title, app }) => {
  const [active, setActive] = useState(null);
  const handleToggle = (index) => {
    active === index ? setActive(null) : setActive(index);
  };
  return (
    <Wrapper className="card-body">
      <h4 className="form-heading">{title}</h4>
      {items.map((item, index) => {
        return <AccordionItem key={index} active={active} handleToggle={handleToggle} item={item} app={app} />;
      })}
    </Wrapper>
  );
};

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, item, app } = props;
  const { heading, content, id } = item;
  const activeItem = active === id;
  return (
    <ItemWrapper
      className="accordion-card"
      backgroundColor={heading.backgroundColor}
      bg={content.img}
      content={content}>
      <div className="accordion-header">
        <div className={`accordion-toggle ${activeItem ? "active" : ""}`} onClick={() => handleToggle(id)}>
          <div className="accordion-heading">
            <div className="accordion-heading-logo">{heading.icon}</div>
            <h5 className="accordion-title">{heading.title}</h5>
          </div>
          {activeItem ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>
      <div
        ref={contentEl}
        className={`collapse ${activeItem ? "show" : ""}`}
        style={activeItem ? { height: contentEl.current.scrollHeight } : { height: "0px" }}>
        <div className="accordion-body">
          <div className={`background ${id}`} />
          <div className="item-bg" />
          <div className="item-content">
            <p>{content.title}</p>
            <button>view xxx jobs now</button>
          </div>
        </div>
      </div>
    </ItemWrapper>
  );
};

const ItemWrapper = styled("div")(({ backgroundColor, bg, content }) => ({
  background: `${backgroundColor}`,
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
  overflow: "hidden",
  ".accordion-toggle": {
    display: "flex",
    padding: "16px 30px",
    alignItems: "center",
    cursor: "pointer",
    justifyContent: "space-between",
    transition: "0.3s",
    h5: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "19px",
      textTransform: "capitalize",
      color: "#FFFFFF",
    },
  },
  ".accordion-heading": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  " .accordion-heading-logo": {
    width: "50px",
  },
  ".accordion-title": {
    fontWeight: "500",
    fontSize: "14px",
    position: "relative",
    marginBottom: "0",
    color: "#475F7B",
    transition: "0.3s",
  },
  ".accordion-icon": {
    position: "relative",
    top: "2px",
    color: "#475F7B",
    transition: "0.35s",
    fontSize: "12px",
  },
  ".accordion-body": {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    minHeight: "1px",
    padding: "15px auto 25px",
    width: "100%",
    button: {
      margin: "0 auto 26px",
      width: "255px",
      background: content?.buttonColor ? content.buttonColor : "linear-gradient(90deg, #D92CFF 0%, #A81BFF 100%)",
      borderRadius: "5px",
      padding: "10px 57px",
      fontFamily: "Lato",
      border: "none",
      fontWeight: 700,
      color: "#fff",
      fontSize: "14px",
      lineHeight: "17px",
      textAlign: "center",
      textTransform: "capitalize",
    },
    ".background": {
      height: "150px",
      background: `url(${bg}) center center`,
      backgroundSize: "cover",
    },
    p: {
      display: "block",
      margin: "0 auto",
      padding: "15px 0 26px",
      maxWidth: "255px",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "19px",
      textAlign: "center",
      textTransform: "capitalize",
      color: content?.textColor ? content.textColor : "#000000",
    },
    ".item-content": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  ".collapse": {
    position: "relative",
    height: 0,
    overflow: "hidden",
    transition: "height 0.35s ease",
    backgroundColor: "#FFFFFF",
  },
  ".collapse.show": {
    height: "auto",
    backgroundColor: "#FFFFFF",
  },
}));

const Wrapper = styled("div")({
  borderRadius: "10px",
  height: "fit-content",
  overflow: "hidden",
  background: "#fff",
  ".form-heading": {
    padding: "21px 24px",
    fontWeight: 800,
    fontSize: "20px",
    lineHeight: "27px",
  },
});

export default Accordion;
