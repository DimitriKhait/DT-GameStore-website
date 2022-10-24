import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavigateGame } from '../NavigateGame/NavigateGame';
import { SearchBar } from '../SearchBar/SearchBar';
import './GameGallery.css';

export function GameGallery() {
    const [gamesArray, setgamesArray] = useState<any[]>([]);
    const [cloneGameArray, setCloneGameArray] = useState<any[]>([]);

    useEffect(() => {
        const axiosGet = async () => {
            const response = await axios('https://localhost:7210/api/myGames');
            // console.log(response);

            setgamesArray(response.data);
            setCloneGameArray(response.data);
        };
        axiosGet();
    }, []);
    // console.log(gamesArray);

    return (
        <div className="gameGallery minHeightClass">
            <h1 className="title">Game Gallery</h1>
            <div className="searchBarDiv">
                <SearchBar
                    gameArray={cloneGameArray}
                    setgamesArray={setgamesArray}
                />
            </div>

            <div className="navigateGameDiv">
                {/**
         going through all the game element recieved from the server
        */}
                {gamesArray.map((curr, i) => (
                    <NavigateGame id={curr.id} game={curr} key={i} />
                ))}
            </div>
        </div>
    );
}
