import styled from "styled-components";
import styles from "./v1.module.css";
import {CardImage, LogoImage} from "./Card-images";
import handleJobClick from "../../../../lib/handleJobClick";


const MonsterV1 = (props) => {
    const Container = styled.div``
    const Title = styled.h1``
    const Logo = styled.div``
    const Img = styled.div``
    const Content = styled.p``
    const BtnRow = styled.div``
    const BtnCol = styled.div``
    const Button = styled.button``
    const Link = styled.a``


    const links = props.Links;

    const ctaClick = function (link, title, src, cpc, newTab, body) {

        //console.log("ctaClick", link, title, src, cpc, newTab, body)

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
            <div className={styles.headerContainer}>

                <Title className={styles.title}>
                    Continue your search on
                </Title>

                <Logo className={styles.logo}>
                    <LogoImage></LogoImage>
                </Logo>
            </div>

            <Img className={styles.imgContainer}>
                <CardImage></CardImage>
            </Img>

            <Content className={styles.content}>
                <span className={styles.bold}>Discover Independence</span>

                <br/>

                Connect with People Around You Who Need Your Skills. Set Your Schedule, Be Your Own Boss.
            </Content>

            <BtnRow className={styles.btnRow}>

                <Button className={styles.buttons} style={{width: "185px"}}
                        onClick={ctaClick.bind(this, links[0].link, links[0].title)}>{links[0].title}</Button>

                <Button className={styles.buttons} style={{width: "185px"}}
                        onClick={ctaClick.bind(this, links[1].link, links[1].title)}>{links[1].title}</Button>

                <Button className={styles.buttons} style={{width: "185px"}}
                        onClick={ctaClick.bind(this, links[2].link, links[2].title)}>{links[2].title}</Button>

                <Button className={styles.buttons} style={{width: "220px"}}
                        onClick={ctaClick.bind(this, links[3].link, links[3].title)}>{links[3].title}</Button>

            </BtnRow>
            <Link className={styles.registerLink}>No thanks, I already have an account</Link>
        </Container>
    )

};

export default MonsterV1;
