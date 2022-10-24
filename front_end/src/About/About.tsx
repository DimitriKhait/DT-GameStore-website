import './About.css';
export function About() {
    return (
        <div className="aboutDiv minHeightClass">
            <h1 className="title">About Us</h1>
            <div className="about">
                <p>
                    D&T Video Games store is a project for learning purposes. It
                    doesnt have any real users (yet) and there still is work to
                    be done. hopefully with the knowledge we have been acquiring
                    the sky is the limit :) We’ve taken our passion for games
                    and created a site that puts gamers first:
                </p>
                <ul>
                    <li>
                        We’ve got all gaming platforms covered, youd be
                        surprised by the classics we are selling.
                    </li>
                    <li>
                        Want to treat yourself with a new story based game? or
                        maybe a racing game. either way this site is just the
                        place for you!
                    </li>
                </ul>
            </div>
            <div className="youtubeVideoDiv">
                <h2 className="youtubeVideoTitle">
                    A BRIEF HISTORY OF VIDEO GAMES
                </h2>
                <iframe
                    width="800"
                    height="500"
                    src="https://www.youtube.com/embed/x24KoVNliMk"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
