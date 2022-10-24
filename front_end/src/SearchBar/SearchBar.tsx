import './SearchBar.css';
export function SearchBar(props: {
    gameArray: any[];
    setgamesArray: Function;
}) {
    const { gameArray, setgamesArray } = { ...props };
    let gameArrayByFilter: any[] = [];
    let searchValue: string;

    let filterFunction = () => {
        //use the data recieved earlier and filter it by the name
        searchValue = (document.querySelector('.searchBar') as HTMLInputElement)
            .value;

        gameArrayByFilter = [];

        gameArray.map((currGame) => {
            if (
                currGame.gameName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            ) {
                if (!gameArrayByFilter.includes(currGame)) {
                    gameArrayByFilter.push(currGame);
                }
            }
        });
        setgamesArray(gameArrayByFilter);
    };

    return (
        <div className="searchBarWrapper">
            <div className="searchDiv">
                <input
                    type="search"
                    name="searchBar"
                    className="searchBar"
                    placeholder="Search for a game in our gallery"
                    onChange={filterFunction}
                />
            </div>
        </div>
    );
}
