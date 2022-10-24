import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CartGameListItem.css";

export function CartGameListItem(props: {
  game: any;
  itemCount: number;
  setItemCount: Function;
}) {
  const { game, itemCount, setItemCount } = { ...props };

  const [gameQuantity, setGameQuantity] = useState<number>(game.gameQuantity);

  function decreaseQuantity() {
    if (gameQuantity !== 1) {
      //   setQuantity(quantity - 1);
      axios({
        method: "delete",
        url: `https://localhost:7210/api/myGames/deleteGameFromCart/${game.userId}&${game.gameId}`,
      })
        .then(function (response) {
          // console.log(response);
          if (response?.status === 200) {
            setItemCount(itemCount - 1);
            setGameQuantity(gameQuantity - 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  function increaseQuantity() {
    // setQuantity(quantity + 1);
    axios({
      method: "post",
      url: `https://localhost:7210/api/myGames/addGameToUserCart/${sessionStorage.getItem(
        "userId"
      )}&${game.gameId}`,
    })
      .then(function (response) {
        //   console.log(response);
        if (response?.status === 200) {
          setItemCount(itemCount + 1);
          setGameQuantity(gameQuantity + 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function deleteAllSpecificGameInstances() {
    axios({
      method: "delete",
      url: `https://localhost:7210/api/AppUserGamePlatform/deleteGameFromCartCompletely/${game.userId}&${game.gameId}`,
    })
      .then(function (response) {
        // console.log(response);
        if (response?.status === 200) {
          setItemCount(itemCount - gameQuantity);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    // console.log(gameQuantity);
  }, [itemCount]);
  return (
    <div className="cartGameListItem">
      <p
        className="gameDetailsInCart"
        onClick={() => {
          alert("go to specific game page");
        }}
      >
        Name: {game.gameNameInCart} <br />
        price: {game.gamePrice}$ <br />
      </p>
      <div className="plusAndMinusDiv">
        <button onClick={decreaseQuantity}>-</button>
        <p>{game.gameQuantity}</p>
        <button onClick={increaseQuantity}>+</button>
      </div>

      <button
        className="removeGameButton"
        onClick={deleteAllSpecificGameInstances}
      >
        Remove
      </button>
    </div>
  );
}
