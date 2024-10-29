import Link from "next/link";
import logEvent from "../../lib/logEvent";
import styles from "./footer.module.css";


const Footer = ({
                    footerMenu, facebookLink, twitterLink, linkedInLink, copyrightText, ads, origin
                }) => (<div className="row no-gutters" style={{}}>
    <div className={styles.FooterDiv}>

        {/* <LogoDiv className="mobile">
        <LogoBearIcon src="/static/images/logo-bear-icon.svg" alt="" />
        <LogoTextIcon src="/static/images/logo-text-icon.svg" alt="" />
      </LogoDiv> */}

        <div className={styles.MenuDiv}>
            <div className={styles.MenuLinkDiv}>
                {Array.isArray(footerMenu) && footerMenu.map((item, index) => {
                    return (
                        (<Link
                            href={item.path}
                            key={index}
                            className={styles.MenuItem}
                            title={item.title}
                            onClick={() => {
                                logEvent("click-footer", {
                                    type: item.title, origin: origin
                                });
                            }}>

                            {" "}
                            {item.title}{" "}

                        </Link>)
                    );
                })}
            </div>

            <div className={styles.SocialIconsDiv}>
                {facebookLink && (<a className={styles.SocialIconLink}
                                     href={facebookLink}
                                     target="_blank"
                                     onClick={() => {
                                         logEvent("click-social", {type: "facebook"});
                                     }}
                >


                    <div className={styles.SocialIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="#fff"
                                fillOpacity="0.8"
                                fillRule="evenodd"
                                d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm2.222 13.778v-1.716c0-.42.09-.722.268-.902.178-.18.575-.271 1.19-.271h1.653V8h-2.722c-1.588 0-2.722.323-3.403.97-.68.647-1.02 1.603-1.02 2.867v1.94H12v2.89h2.188v8.666h4.034v-8.666h2.722l.39-2.89h-3.112z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>

                </a>)}

                {twitterLink && (<a className={styles.SocialIconLink}
                                    href={twitterLink}
                                    target="_blank"
                                    onClick={() => {
                                        logEvent("click-social", {type: "twitter"});
                                    }}
                >

                    <div className={styles.SocialIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="#fff"
                                fillOpacity="0.8"
                                fillRule="evenodd"
                                d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm9.333 11.357a5.882 5.882 0 01-2.056.573c.808-.484 1.334-1.171 1.579-2.063-.784.484-1.542.79-2.277.917-.71-.79-1.567-1.184-2.57-1.184-1.004 0-1.849.356-2.534 1.07-.686.712-1.029 1.59-1.029 2.635 0 .382.025.662.074.84-2.987-.153-5.423-1.438-7.308-3.857a3.789 3.789 0 00-.478 1.833c0 1.35.527 2.38 1.58 3.094-.539 0-1.078-.153-1.616-.459v.038c0 .892.275 1.675.826 2.35.55.674 1.23 1.1 2.038 1.279-.392.102-.71.153-.955.153-.146 0-.367-.026-.66-.077.22.739.636 1.344 1.248 1.815.612.47 1.297.719 2.056.744-1.297 1.07-2.766 1.605-4.406 1.605-.172 0-.453-.026-.845-.077 1.665 1.12 3.476 1.68 5.435 1.68 3.06 0 5.515-1.088 7.363-3.265 1.848-2.177 2.773-4.602 2.773-7.276v-.458a7.1 7.1 0 001.762-1.91z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>

                </a>)}

                {linkedInLink && (<a className={styles.SocialIconLink}
                                     href={linkedInLink}
                                     target="_blank"
                                     onClick={() => {
                                         logEvent("click-social", {type: "linkedin"});
                                     }}
                >

                    <div className={styles.SocialIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="#fff"
                                fillOpacity="0.8"
                                fillRule="evenodd"
                                d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm8.32-8.96v-5.943c0-3.183-1.692-4.665-3.949-4.665-1.822 0-2.636 1.008-3.091 1.713v-1.469h-3.43c.046.973 0 10.364 0 10.364h3.43v-5.788c0-.31.023-.618.114-.84.248-.62.812-1.26 1.76-1.26 1.24 0 1.737.95 1.737 2.343v5.545h3.429zm-7.04-8.895v.034h-.023l.012-.018a.552.552 0 00.01-.016zM8.32 9.47c0-1.017.768-1.79 1.941-1.79 1.174 0 1.895.773 1.918 1.79 0 .995-.744 1.792-1.94 1.792h-.023c-1.15 0-1.896-.797-1.896-1.792zm3.633 13.57h-3.43V12.676h3.43V23.04z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </a>)}
            </div>
        </div>

        {/* <FooterAdDiv>{ads}</FooterAdDiv> */}
        <div className={styles.RightsDiv}>
            <span className={styles.RightsSpan}> {copyrightText} </span>
        </div>
    </div>
</div>);

export default Footer;
