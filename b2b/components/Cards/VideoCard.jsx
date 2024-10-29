import React, {useState} from "react";
import styled from "styled-components";

import VideoPopup from "../../components/Popups/VideoPopup";
import {PlayIcon, VideoIcon} from "../Icons";

const VideoCard = ({title, subtitle, previewSrc, app, emdedId}) => {
    const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);

    const cardClick = function () {

        setVideoPopupOpen(true);

        try {
            app.b2bEventHandle({
                eventName: "VideoCardSlotClick"
            });
        } catch (e) {

        }

    }

    return (
        <div>

            <Wrapper id={"video-card-wrapper"} src={previewSrc} onClick={cardClick}>
                <PlayButtonWrapper>
                    <PlayIcon/>
                </PlayButtonWrapper>
                <Top>
                    <VideoIcon/>
                    <Subtitle>Video</Subtitle>
                </Top>
                <Bottom>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </Bottom>


            </Wrapper>

            <VideoPopup  open={isVideoPopupOpen} handleClose={() => setVideoPopupOpen(false)} embedId={emdedId}
                         app={app}/>

        </div>
    );
};

const Wrapper = styled("div")(({src}) => ({
    width: "100%",
    maxWidth: "700px",
    height: "263px",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    padding: "25px 23px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

const PlayButtonWrapper = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
});

const Top = styled("div")({
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
});

const Bottom = styled("div")({
    display: "flex",
    flexDirection: "column",
    rowGap: "13px",
    maxWidth: "134px",
});

const Title = styled("p")({
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: "22px",
    lineHeight: "27px",
    textTransform: "capitalize",
});

const Subtitle = styled("p")({
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "16px",
    textTransform: "capitalize",
});

export default VideoCard;
