import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./Footer/Footer";
import { Register } from "./Register/Register";
import { NavBar } from "./NavBar/NavBar";
import { User } from "./User/User";
import { Home } from "./Home/Home";
import { About } from "./About/About";
import { Contact } from "./Contact/Contact";
import { Games } from "./Games/Games";
import { GameGallery } from "./GameGallery/GameGallery";
import { GameCard } from "./GameCard/GameCard";
import { Login } from "./Login/Login";
import { CartSideWindow } from "./CartSideWindow/CartSideWindow";
import axios from "axios";

function App() {
  // let dummyUser:User={
  //     "asdas":asfsa,
  // }
  const [userDetails, setUserDetails] = useState<any>();
  const [loginStatus, setloginStatus] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleOpenDrawerButton() {
    setDrawerOpen(!drawerOpen);
  }

  useEffect(() => {
    if (sessionStorage.getItem("userLoggedIn") === "True") {
      setloginStatus(true);
    }
  }, []);

  useEffect(() => {
    let notLoggedInClass = document.querySelector(
      ".notLogginYet"
    ) as HTMLElement;
    let loggedInClass = document.querySelector(".loggedIn") as HTMLElement;
    if (loginStatus) {
      notLoggedInClass.style.display = "none";
      loggedInClass.style.display = "block";
    } else {
      notLoggedInClass.style.display = "block";
      loggedInClass.style.display = "none";
    }

    const axiosGet = async () => {
      const countItemsInCartResponse = await axios(
        `https://localhost:7210/api/myGames/countItemsInCartByUserId/${sessionStorage.getItem(
          "userId"
        )}`
      );

      const response = await axios(
        `https://localhost:7210/api/App_users/${sessionStorage.getItem(
          "userId"
        )}`
      );
      // console.log(response);
      setItemCount(countItemsInCartResponse.data[0]?.countGamesInCart);
      setUserDetails(response.data);
    };

    if (loginStatus) {
      // console.log("test2");
      axiosGet();
    }
  }, [loginStatus, itemCount]);

  return (
    <div className="App">
      <NavBar
        userDetail={userDetails}
        setUserDetails={setUserDetails}
        setloginStatus={setloginStatus}
        setItemsToCart={setItemCount}
        numberOfItemsInCart={itemCount}
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
      />

      <CartSideWindow
        userDetail={userDetails}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        itemCount={itemCount}
        setItemCount={setItemCount}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="/games" element={<Games />}>
          <Route path="/games/game" element={<GameGallery />} />
          <Route
            path="/games/game/:my_game_id"
            element={
              <GameCard itemsCount={itemCount} setItemsToCart={setItemCount} />
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <Login loggedIn={setloginStatus} userDetail={setUserDetails} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
