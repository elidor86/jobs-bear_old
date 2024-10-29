import styled from "styled-components";
import styles from "./v2.module.css";
import {CardImage, LogoImage} from "./Card-images";
import handleJobClick from "../../../../lib/handleJobClick";
import {size} from "underscore";


const MonsterV2 = (props) => {
    const Container = styled.div``
    const Title = styled.h1``
    const Logo = styled.a``
    const Img = styled.div``
    const Content = styled.p``
    const BtnRow = styled.div``
    const BtnCol = styled.div``
    const Button = styled.button``
    const Link = styled.a``

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
            <Title className={styles.title}>Continue your search on <Logo href="/" className={styles.logo}>
                <LogoImage></LogoImage> </Logo> </Title>
            <Img className={styles.cardImg}><CardImage></CardImage></Img>
            <Content className={styles.content}>Work From Anywhere<br/>Find A Remote Job!</Content>
            <BtnRow className={styles.btnRow}>
                <BtnCol>
                    <Button className={styles.buttons} onClick={ctaClick.bind(this, links[0].link, links[0].title)}>{links[0].title}</Button>
                    <Button className={styles.buttons} onClick={ctaClick.bind(this, links[1].link, links[1].title)}>{links[1].title}</Button>
                </BtnCol>
                <Button className={styles.buttons} style={{width:"155px"}} onClick={ctaClick.bind(this, links[2].link, links[2].title)}>{links[2].title}</Button>
            </BtnRow>
            <Link className={styles.registerLink} >No thanks, I already have an account</Link>
        </Container>
    )

};

export default MonsterV2;