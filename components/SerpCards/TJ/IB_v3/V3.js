import styled from "styled-components";
import styles from "./v3.module.css";
import CardImage from "./Card-image3";
import handleJobClick from "../../../../lib/handleJobClick";

const CommuteCard = (props) => {
    const Container = styled.div``;
    const Title = styled.h1``;
    const Bold = styled.b``;
    const Image = styled.div``;
    const Content = styled.p``;
    const Row = styled.div``;
    const Col = styled.div``;
    const Button = styled.button``;
    const Link = styled.a``;
    const Btn = styled.button``;


    const links = props.Links;

    const ctaClick = function (link, title, src, cpc, newTab, body) {

        handleJobClick(
            link,
            title,
            props.src,
            cpc,
            newTab,
            props.body
        );
    }

    return (
        <Container className={styles.cardContainer}>

            <Title className={styles.title}>
                Continue your search on <Bold className={styles.bold}>Toataljobs</Bold>
            </Title>

            <Image className={styles.cardImage}>
                <CardImage></CardImage>
            </Image>

            <Content className={styles.content} dangerouslySetInnerHTML={{
                __html: props.title
            }}>

            </Content>

            <Row className={styles.buttonsRow}>
                <Col className={styles.buttonsCol}>
                    <Button className={styles.buttons}
                            onClick={ctaClick.bind(this, links[0].link, links[0].title)}>{links[0].title}</Button>
                    <Button className={styles.buttons}
                            onClick={ctaClick.bind(this, links[1].link, links[1].title)}>{links[1].title}</Button>
                </Col>
                <Col className={styles.buttonsCol}>
                    <Button className={styles.buttons}
                            onClick={ctaClick.bind(this, links[2].link, links[2].title)}>{links[2].title}</Button>
                    <Button className={styles.buttons}
                            onClick={ctaClick.bind(this, links[3].link, links[3].title)}>{links[3].title}</Button>
                </Col>
            </Row>
            <Link className={styles.registerLink}>
                No thanks i alredy have an account
            </Link>
        </Container>
    );
};

export default CommuteCard;
