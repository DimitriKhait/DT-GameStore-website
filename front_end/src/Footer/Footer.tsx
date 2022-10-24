import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export function Footer() {
    return (
        <div className="footerWrap">
            <footer className="footer">
                <div className="social">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="icons"
                            icon={faFacebook}
                        ></FontAwesomeIcon>
                    </a>
                    <a
                        href="https://www.Twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="icons"
                            icon={faTwitter}
                        ></FontAwesomeIcon>
                    </a>
                    <a
                        href="https://www.Youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="icons"
                            icon={faYoutube}
                        ></FontAwesomeIcon>
                    </a>
                    <a
                        href="https://www.Linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="icons"
                            icon={faLinkedin}
                        ></FontAwesomeIcon>
                    </a>
                </div>
                <p className="para">
                    Copyright &copy; 2022 - D<span className="logoName">&</span>
                    T <span className="logoName">Game</span>Store
                </p>
            </footer>
        </div>
    );
}
