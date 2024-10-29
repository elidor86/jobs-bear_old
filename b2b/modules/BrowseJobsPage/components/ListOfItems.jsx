import styled from "styled-components";
import React from "react";


const ListOfItems = ({titleOfSection, items}) => (
    <Wrapper>
        <Title>{titleOfSection}</Title>
        <Container>
            {items.map(({title, link}) => (
                <Item href={link} key={title} >
                    {title}
                </Item>
            ))}
        </Container>
    </Wrapper>
);

const Wrapper = styled("div")({
    display: "flex",
    gap: "22px",
    flexDirection: "column",
    backgroundColor: "#F0F1F9",
});

const Container = styled("div")(() => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    columnGap: "50px",
    rowGap: "23px",

    maxWidth: "unset",
    flexWrap: "wrap",
    "@media(max-width: 900px)": {
        gridTemplateColumns: "1fr 1fr 1fr",
    },
    "@media(max-width: 750px)": {
        gridTemplateColumns: "1fr 1fr",
        columnGap: "30px",
        rowGap: "40px",
        maxHeight: "100%",
    },
}));

const Title = styled("h4")({
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "42px",
    color: "#414042",
});

const Item = styled("a")({
    fontFamily: "Lato",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "20px",
    textDecoration: "underline",
    color: "#414042",
    padding: "5px 0",
    "@media(max-width: 750px)": {
        fontSize: "16px",
        lineHeight: "20px",
        whiteSpace: "unset",
    },
});

export default ListOfItems;
