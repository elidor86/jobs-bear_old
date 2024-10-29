import React, {Component} from "react";

import styled from "styled-components";
import Modal from "react-modal";
import config from "../config/styleConsts";
import SearchForm from "../SearchForm/SearchForm";

import logEvent from "../../lib/logEvent";

const {mobileMaxWidth} = config;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  justify-content: center;
`;

const SearchModal = ({
                         isOpen,
                         onRequestClose,
                         onSubmit,
                         buttonTitle,
                         setKeyword,
                         getKeyword,
                         keyword,
                         getLocation,
                         app
                     }) => {
    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    background: "linear-gradient(121.33deg, #5C6AC4 0%, #202E78 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 999999999
                },
                content: {
                    background: "none",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    inset: "auto",
                    padding: 0,
                    margin: "auto",
                    position: "relative",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }}
        >
            <CloseIcon
                onClick={() => {
                    onRequestClose();
                    logEvent("click-dismiss_search", {origin: "search"});
                }}
                src="/static/images/icon-close.svg"
            />
            <SearchForm
                layout='modal'
                classNameContent="searchModalForm"
                onSubmit={() => {
                    window.scrollTo(0, 0);
                    onRequestClose();
                    onSubmit();

                }}
                buttonTitle={buttonTitle}
                setKeyword={setKeyword}
                getKeyword={getKeyword}
                keyword={keyword}
                getLocation={getLocation}
                app={app}
            />
        </Modal>
    );
};

export default SearchModal;
