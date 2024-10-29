import styled from "styled-components";
import styles from "./v1.css";
import CardImage from "./card-image";


const Test = () => {
  const Container = styled.div``;
  const Title = styled.h1``;
  const Bold = styled.b``;
  const Image = styled.div``;
  const Content = styled.p``;
  const Row = styled.div``;
  const Col = styled.div``;
  const Button = styled.button``;
  const Link = styled.a``;
  const Cashier = styled.a``;

  return (
    <>
      <Container className={styles.cardContainer}>
        <Title className={styles.title}>
          Continue your search on <Bold className={styles.bold}>Toataljobs</Bold>
        </Title>
        <Image className={styles.cardImg}>
        <CardImage></CardImage>
        </Image>
        <Content className={styles.content}>
          Preferred Commuting
          <br />
          Distance For A <Cashier className={styles.cashierLink} href="/">Cashier</Cashier> Job?
        </Content>
        <Row className={styles.buttonsRow}>
          <Col className={styles.buttonsCol}>
            <Button className={styles.buttons}>20 Min Away</Button>
            <Button className={styles.buttons}>2 Hours Away</Button>
          </Col>
          <Col className={styles.buttonsCol}>
            <Button className={styles.buttons}>45 Min Away</Button>
            <Button className={styles.buttons}>1 Hour Away</Button>
          </Col>
        </Row>
        <Link className={styles.registerLink} href="/">No thanks i alredy have an account</Link>
      </Container>
    </>
  );
};

export default Test;
