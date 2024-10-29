import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './Gdpr.module.css';
import logEvent from '../../lib/logEvent';

const Gdpr = ({jobPageVersion}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const shouldShowGdpr = () => {



            const clientVars = window.ClientVars;

            try {
                if (window.ClientVars && window.ClientVars.gdpr == true) {
                    return false;
                }
            } catch (e) {

            }

            try {
                if (window.ClientVars && window.ClientVars.geo != "gb") {
                    return false;
                }
            } catch (e) {

            }

            return true;

        };

        let _visible = shouldShowGdpr();

        setVisible(_visible);

        const timeoutId = setTimeout(() => setVisible(false), 1000 * 12);

        return () => clearTimeout(timeoutId);
    }, []);

    const closeBtn = () => {
        setVisible(false);

        logEvent('closeGdpr');
        try {
            window.ClientVars.gdpr = true;
        } catch (e) {
            console.error(e);
        }
    };

    return visible && (
        <div className={styles.mainContainer}>
            <div className={styles.closeBtn} onClick={closeBtn}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="17" fill="white" fillOpacity="0.3" stroke="white" stroke-width="2"/>
                    <path
                        d="M25 12.41L23.59 11L18 16.59L12.41 11L11 12.41L16.59 18L11 23.59L12.41 25L18 19.41L23.59 25L25 23.59L19.41 18L25 12.41Z"
                        fill="white"/>
                </svg>
            </div>
            <div className={styles.text}>
                jobs-bear.com uses cookies. By continuing you are agreeing to our use of cookies. <a
                href="/cookies"
                target="_blank" rel="noopener noreferrer">Learn more</a>
            </div>
        </div>
    );
};

Gdpr.propTypes = {
    jobPageVersion: PropTypes.string
};

export default Gdpr;
