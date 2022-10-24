import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartGameListItem } from "../CartGameListItem/CartGameListItem";
import "./SlideDrawer.css";

export function SlideDrawer(props: {
  show: boolean;
  userDetails: any;
  setItemCount: Function;
  itemCount: number;
}) {
  const { show, userDetails, setItemCount, itemCount } = { ...props };
  const [gamesArray, setgamesArray] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  let drawerClasses = show ? "side-drawer open" : "side-drawer";

  useEffect(() => {
    if (drawerClasses === "side-drawer open") {
      const axiosGet = async () => {
        const response = await axios(
          `https://localhost:7210/api/myGames/userCart/${userDetails.id}`
        );

        setgamesArray(response.data);
      };
      axiosGet();
    }
  }, [drawerClasses]);

  useEffect(() => {
    let count = 0;
    for (const currGame of gamesArray) {
      // console.log(currGame);
      count += currGame.gamePrice * currGame.gameQuantity;
    }
    setTotalPrice(count);
    // console.log(`item count of cart changed: ${itemCount}`);
    // console.log(`total price: ${count}`);
  }, [gamesArray]);
  // console.log(gamesArray[0]?.gameQuantity);

  useEffect(() => {
    if (drawerClasses === "side-drawer open") {
      const axiosGet = async () => {
        const response = await axios(
          `https://localhost:7210/api/myGames/userCart/${userDetails.id}`
        );

        setgamesArray(response.data);
      };
      axiosGet();
    }
  }, [itemCount]);

  return (
    <div className={drawerClasses} id="sideDrawerDiv">
      <h1 className="userNameInCart">
        <span className="userNameInNavbar">
          {userDetails?.fname[0].toUpperCase()}
          {userDetails?.fname.slice(1)}
        </span>
        's Cart:
      </h1>

      {gamesArray.map((currGame, i) => (
        <CartGameListItem
          key={i}
          game={currGame}
          setItemCount={setItemCount}
          itemCount={itemCount}
        />
      ))}
      <div className="totalPriceDiv">
        <h2>Total Price: {totalPrice}$</h2>
      </div>
      <div className="checkoutDiv">
        <button
          onClick={() => {
            alert("checkout preccess");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
