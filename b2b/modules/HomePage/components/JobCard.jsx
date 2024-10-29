import styled from "styled-components";


const JobCard = ({icon, title, link, description, app}) => (
    <Wrapper>
        <Left>
            <img src={icon} alt={title + " image"}/>
        </Left>
        <Right>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Action onClick={(e) => app.b2bEventHandle({eventName: "BrowseJobsBy", keyword: link.keyword})}>VIEW
                JOBS &nbsp;&gt;</Action>
        </Right>
    </Wrapper>
);

const Wrapper = styled.div`
  border-bottom: 5px solid rgba(217, 44, 255, 0.5);
  padding-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  padding-left: 36px;
  padding-right: 36px;

  @media (max-width: 701px) {
    border-top: 4px solid rgba(168, 193, 223, 0.2);
    border-bottom: none;
    padding: 27px 0 23px;
  }
`;

const Left = styled.div`
  img,
  svg {
    width: 62px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h4`
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  color: #3e4598;
  margin-bottom: 14px;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #3e4598;
  margin-bottom: 14px;
  padding-right: 10px;
  margin-top: auto;

  @media (max-width: 701px) {
    max-width: 230px;
  }
`;

const Action = styled.a`
  display: inline-block;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  color: #d92cff;
  cursor: pointer;
`;

export default JobCard;
