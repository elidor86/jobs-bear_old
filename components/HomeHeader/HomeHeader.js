import styled from "styled-components";
import SearchForm from "../SearchForm/SearchForm";

const HomeDiv = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(161.11deg, #5c6ac4 0%, #202e78 99.44%);
  box-shadow: 0px 1px 4px rgba(77, 77, 77, 0.24);
`;
const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const LogoTextIcon = styled.img`
  font-size: 20px;
  line-height: 25px;
  padding-top: 16px;
  box-sizing: border-box;
`;

const HomeHeaderDiv = styled.div`
  min-height: 266px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
`;

const HomeHeaderIcon = styled.img`
  position: absolute;
  z-index: 2;
  bottom: -8px;
`;

const HomeHeaderBackgroundDiv = styled.div`
  height: 32px;
  width: 100%;
  background: #000639;
  content: "  ";
  position: absolute;
  z-index: 1;
  bottom: 0;
`;

const SearchJobDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #000639;
  padding: 10px;
  box-sizing: border-box;
`;

const SearchJobTitle = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 20px;
  box-sizing: border-box;
`;

const SearchJobText = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  padding-top: 23px;
  max-width: 80%;
  box-sizing: border-box;
`;

const Button = styled.button`
  min-height: 47px;
  border-radius: 5px;
  border: none;
  background: linear-gradient(94.2deg, #fe909c 0.65%, #ff6c98 96.18%);
  padding: 0px 50px;
  align-items: center;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;
const ButtonIcon = styled.img`
  margin-right: 6px;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
`;

const ActionDivMobile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  margin: 32px 0 36px 0;
  box-sizing: border-box;
`;

const FormDiv = styled.div`
  margin: 32px 0 46px 0;
`;

class HomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        keyword: "",
        location: ""
      }
    };
  }

  render() {
    const {
      title,
      text,
      buttonTitle,
      onSubmit,
      openModalSearch,
      app,
      keyword,
    } = this.props;
    return (
      <HomeDiv>
        <LogoDiv>
          <LogoTextIcon src="/static/images/logo-text-icon.svg" alt="" />
        </LogoDiv>

        <HomeHeaderDiv>
          <HomeHeaderIcon src="/static/images/girl-and-bear.svg" alt="" />
          <HomeHeaderBackgroundDiv />
        </HomeHeaderDiv>

        <SearchJobDiv>
          <SearchJobTitle> {title} </SearchJobTitle>
          <SearchJobText> {text}</SearchJobText>
          <FormDiv className="desktop">
            <SearchForm
              buttonTitle={buttonTitle}
              onSubmit={onSubmit}
              setKeyword={this.props.setKeyword}
              keyword={keyword}
              app={app}
            />
          </FormDiv>

          <ActionDivMobile className="mobile">
            <Button type="button" onClick={openModalSearch}>
              <ButtonIcon src="/static/images/search_icon.svg" /> {buttonTitle}
            </Button>
          </ActionDivMobile>
        </SearchJobDiv>
      </HomeDiv>
    );
  }
}

export default HomeHeader;
