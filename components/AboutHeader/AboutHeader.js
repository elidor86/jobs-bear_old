import styled from "styled-components";
import SearchForm from "../SearchForm/SearchForm";
import Router from "next/router";
import logEvent from "../../lib/logEvent";

const AboutDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AboutHeaderDiv = styled.div`
  background: linear-gradient(161.79deg, #5c6ac4 0%, #202e78 100%);
  box-shadow: 0px 1px 4px rgba(77, 77, 77, 0.24);
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
  text-align: center;
  padding: 16px 0 32px 0;
`;

const LogoTextIcon = styled.img`
  cursor: pointer;
`;

const AboutHandshakeImage = styled.img`
  padding-top: 12px;
`;

const AboutContentDiv = styled.div`
  background: #eff1f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 32px 0 48px;
`;

const AboutHeaderTitle = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 20px;
  padding-top: 32px;
`;

const AboutHeaderText = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  padding-top: 18px;
  box-sizing: border-box;
`;

const ContentText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  max-width: 812px;
  color: #000639;
  opacity: 0.6;
  padding: 0 16px;
  box-sizing: border-box;
`;

const ActionDiv = styled.div`
  padding-top: 32px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

const Button = styled.button`
  min-height: 47px;
  width: 230px;
  border-radius: 5px;
  background: linear-gradient(96.69deg, #fe909c 0.65%, #ff6c98 96.18%);
  text-align: center;
  padding: 0 50px;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
  justify-content: center;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
`;

const ButtonHeader = styled.button`
  min-height: 47px;
  border-radius: 5px;
  border: 2px solid #ffffff;
  background: none;
  padding: 0px 20px;
  align-items: center;
  justify-content: center;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  margin-right: 6px;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
`;

const ActionDivMobile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin-top: 32px;
  box-sizing: border-box;
`;

const HeaderMobile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  cursor: pointer;
`;

const AboutHeader = ({
  onSubmit,
  buttonTitle,
  title,
  text,
  content,
  openModalSearch,
  setKeyword,
  app,
  keyword
}) => (
  <AboutDiv>
    <AboutHeaderDiv>
      <LogoTextIcon
        onClick={() => {
          logEvent("click-logo", { origin: "about" });
          Router.push("/");
        }}
        className="desktop"
        src="/static/images/logo-text-icon.svg"
        alt=""
      />
      <HeaderMobile className="mobile">
        <Logo
          onClick={() => {
            Router.push("/");
          }}
          src={"/static/images/logo.svg"}
        />
        <ButtonHeader onClick={openModalSearch}>
          <ButtonIcon src="/static/images/search_icon.svg" /> {buttonTitle}
        </ButtonHeader>
      </HeaderMobile>
      <AboutHandshakeImage src="/static/images/handshake.svg" alt="" />
      <AboutHeaderTitle>{title}</AboutHeaderTitle>
      <AboutHeaderText dangerouslySetInnerHTML={{ __html: text }} />
    </AboutHeaderDiv>

    <AboutContentDiv>
      <ContentText dangerouslySetInnerHTML={{ __html: content }} />
      <ActionDiv className="desktop">
        <SearchForm
          onSubmit={onSubmit}
          buttonTitle={buttonTitle}
          setKeyword={setKeyword}
          keyword={keyword}
          app={app}
        />
      </ActionDiv>
      <ActionDivMobile className="mobile">
        <Button
          onClick={() => {
            openModalSearch();
            logEvent("click-open_search", { origin: "about" });
          }}
        >
          <ButtonIcon src="/static/images/search_icon.svg" /> {buttonTitle}
        </Button>
      </ActionDivMobile>
    </AboutContentDiv>
  </AboutDiv>
);

export default AboutHeader;
