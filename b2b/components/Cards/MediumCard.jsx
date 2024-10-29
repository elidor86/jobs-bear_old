import React from "react";
import styled from "styled-components";
import handleJobClick from "../../../lib/handleJobClick";

const SmallCard = ({img, label, title, buttonText, app, job}) => {

    const display_job_modal = function () {

        return true
        const res = false;


        try {

            let {
                src, hash, app, key, job_display_rules
            } = job;


            if (Array.isArray(job_display_rules) == true) {

                for (let index in job_display_rules) {

                    let rule = job_display_rules[index];


                    if (rule == "email_opt_in") {

                        let ProvidedEmail = app.getProvidedEmail();

                        if (ProvidedEmail) {
                            return false
                        } else {
                            return true;
                        }


                    } else if (rule == "job_modal") {
                        return true;
                    }

                }

            }
        } catch (e) {

        }


        return res;
    }

    return (
        <Wrapper>
            <Img background={img}/>
            <Content>
                {label && <Label>The Bear’s recommend</Label>}
                <img src="/static/b2b/images/cards/mediumCard/Bear.png" alt="bear"/>
                <Container>
                    <span>{title}</span>
                    <button>{buttonText}</button>
                </Container>
            </Content>
        </Wrapper>
    );
};

const Wrapper = styled("div")({
    marginTop: "15px",
    marginBottom: "10px",
    maxWidth: "700px",
    width: "100%",
    borderRadius: "0px",
    backgroundColor: "#fff",
    overflow: "hidden",
    height: "fit-content",
});

const Label = styled("div")({
    padding: "8px 25px",
    position: "absolute",
    top: "-20px",
    right: 0,
    background: "linear-gradient(90deg, #FE8E9C 0%, #FE7098 100%)",
    borderRadius: "30px 0px 0px 30px",
    fontFamily: "Lato",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    textTransform: "capitalize",
});

const Content = styled("div")({
    position: "relative",
    padding: "29px 0px 23px",
    img: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
});

const Container = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "column",
    width: "240px",
    span: {

        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "15px",
        lineHeight: "22px",
        color: "#0B0A0A",
    },
    button: {
        padding: "5px 5px",
        width: "100%",
        border: "none",
        borderRadius: "6px",
        color: "#FFFFFF",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "20px",
        textTransform: "capitalize",
        background: "linear-gradient(45deg,#5765B5,#9CABFF,#5765B5)",
        backgroundSize: "400% 400% !important",
        WebkitAnimation: "glare 5s ease infinite !important",
        MozAnimation: "glare 5s ease infinite !important",
        animation: "glare 5s ease infinite !important"

    }
});

const Img = styled("div")(({background}) => ({
    background: `url(${background}) center center`,
    "background-size": "cover",
    "background-position": "center center",
    "background-repeat": "no-repeat",

    height: "162px",
}));
export default SmallCard;
