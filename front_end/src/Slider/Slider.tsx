import './Slider.css';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Slider() {
    const [pictureArray, setPictureArray] = useState<any[]>([]);

    useEffect(() => {
        const axiosGet = async () => {
            const response = await axios(
                'https://localhost:7210/api/myGames/gamePictures'
            );
            // console.log(response);

            setPictureArray(response.data);
        };
        axiosGet();
    }, []);
    // console.log(pictureArray);

    return (
        <div className="slide-container">
            <Fade>
                {pictureArray.map((pictureArray, index) => (
                    <div className="each-fade" key={index}>
                        <div className="image-container">
                            <img src={pictureArray} alt={'Video Game pic'} />
                        </div>
                        {/* <h2>{fadeImage.caption}</h2> */}
                    </div>
                ))}
            </Fade>
        </div>
    );
}
