import { useNavigate } from 'react-router-dom';
import './NavigateGame.css';

export function NavigateGame(props: { id: string; game: any }) {
    const navigate = useNavigate();
    const id = props.id;

    return (
        <div
            className="navigateGame"
            onClick={() => {
                navigate(`/games/game/${id}`);
            }}
        >
            <div className="gamesGallery">
                <img src={`${props.game.picUrl}`} alt="GamePicture" />
                <h3>{`${props.game.gameName}`}</h3>
                <p>{`Price: ${props.game.price}$`}</p>
            </div>
        </div>
    );
}
