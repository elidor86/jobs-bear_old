import React, {useRef, useState} from "react";
import styled from "styled-components";

import Popup from "./Popup";
import {CloseDialogIcon} from "../Icons";

const VideoPopup = ({open, handleClose, embedId, app}) => {
    const [iframeRef, setIframeRef] = useState(null);
    const iframeEl = useRef(null);

    function onLoad() {
        setIframeRef(iframeEl.current);
    }

    const handlePopupClose = () => {
        try {
            iframeRef.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
        } catch (e) {

        }
        handleClose();
    };

    const CtaClick = function () {
        //console.log("CtaClick");
        try {
            let params = {
                eventName: "videoCardCtaClick",
                embedId,
            };

            app.b2bEventHandle(params);
        } catch (e) {
        }
    };

    const uid = function () {

        let uid = '_' + Math.random().toString(36).substr(2, 9);
        return uid

    }


    return (
        <Popup open={open} handleClose={handlePopupClose}>
            <VideoWrapper>
                <CloseButton onClick={handlePopupClose}>
                    <CloseDialogIcon/>
                </CloseButton>
                {
                    open ? <iframe
                        ref={iframeEl}
                        onLoad={onLoad}
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${embedId}?autoplay=0&showinfo=0&enablejsapi=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    /> : null

                }

                <HustleButton onClick={CtaClick}>View side hustle jobs & more info</HustleButton>
            </VideoWrapper>
        </Popup>
    );
};

const VideoWrapper = styled("div")({
    width: "390px",
    height: "625px",
    position: "relative",

    "& iframe": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        border: "none",

        "@media (max-height: 800px)": {
            maxHeight: "80vh",
            maxWidth: "80vw",
        },
    },
});

const CloseButton = styled("button")({
    position: "absolute",
    // top: "-57px",
    // right: "32px",
    border: "none",
    background: "transparent",
    width: "24px",
    height: "24px",
    boxShadow: "none",
    cursor: "pointer",

    "& svg": {
        fill: "#FFFFFF",
        width: "24px",
        height: "24px",
    },

    top: "0",
    right: "0",
    "@media (max-width: 600px)": {
        right: "10px",
        top: "-30px",
    },

    "@media (max-width: 700px) and (max-height: 800px)": {
        top: "-40px",
    },

    "@media (max-width: 700px) and (max-height: 750px)": {
        top: "0",
        right: "40px",
    },
});

const HustleButton = styled("button")({
    borderRadius: "60px",
    background: "linear-gradient(270deg, #D92CFF -0.01%, #A81BFF 99.9%)",
    border: "none",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "313px",
    height: "43px",
    position: "absolute",
    bottom: "-76px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: "16px",
    lineHeight: "20px",

    "@media (max-height: 800px)": {
        bottom: "-20px",
    },

    "@media (max-height: 750px)": {
        bottom: "0px",
    }
});

export default VideoPopup;
