import styled from "styled-components";

const FeedbackCard = ({ description, author, image }) => (
  <Wrapper>
    <AuthorImage src={image} alt={author} />
    <QuoteImage src="/static/b2b/images/homepage/feedback/quote.svg" alt="Quote icon" />
    <RatingImage src="/static/b2b/images/homepage/feedback/rating.svg" alt="5 stars rating" />
    <Description>{description}</Description>
    <Author>{author}</Author>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-top: 100px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 23px;
`;

const AuthorImage = styled.img`
  width: 65px;
  border-radius: 50%;
  position: absolute;
  top: -52px;
  left: 50%;
  transform: translateX(-50%);
`;

const QuoteImage = styled.img`
  margin: 12px 0;
  width: 21px;
`;

const RatingImage = styled.img`
  width: 95px;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #414042;
  margin-top: 14px;
  padding-left: 24px;
  padding-right: 24px;
`;

const Author = styled.h4`
  
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  color: #414042;
  margin-top: auto;
`;

export default FeedbackCard;
