import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";

export function NavBar(props: {
  userDetail: any;
  setUserDetails: Function;
  setloginStatus: Function;
  numberOfItemsInCart: number;
  setDrawerOpen: Function;
  drawerOpen: boolean;
  setItemsToCart: Function;
}) {
  const navigate = useNavigate();

  let {
    userDetail,
    setUserDetails,
    setloginStatus,
    numberOfItemsInCart,
    setDrawerOpen,
    drawerOpen,
    setItemsToCart,
  } = {
    ...props,
  };

  return (
    <div className="navbar">
      <h1
        className="logo"
        onClick={() => {
          navigate(`/home`);
        }}
      >
        D<span className="logoName">&</span>T <FontAwesomeIcon icon={faXbox} />
        <span className="logoName"> Game</span>Store
      </h1>

      <div className="nonRegisterLoginDiv">
        <ul>
          <li
            className="navItem"
            onClick={() => {
              navigate(`/home`);
            }}
          >
            Home
          </li>
          <li
            className="navItem"
            onClick={() => {
              navigate(`/games/game`);
            }}
          >
            Games
          </li>
          {/* <li
            className="navItem"
            onClick={() => {
              navigate(`/contact`);
            }}
          >
            Contact
          </li> */}
          <li
            className="navItem"
            onClick={() => {
              navigate(`/about`);
            }}
          >
            About
          </li>
        </ul>
      </div>
      <div className="RegisterLoginDiv notLogginYet">
        <ul>
          <li
            className="navItem"
            onClick={() => {
              navigate(`/register`);
            }}
          >
            Register
          </li>
          <li
            className="navItem"
            onClick={() => {
              navigate(`/login`);
            }}
          >
            Login
          </li>
        </ul>
      </div>
      <div className="loggedIn">
        <ul className="nameCartLogoutUl">
          <li className="navItem">
            Hello{" "}
            <span className="userNameInNavbar">
              {userDetail?.fname[0].toUpperCase()}
              {userDetail?.fname.slice(1)}
            </span>
          </li>
          <li className="navItem shoppingCartIcon">
            <ShoppingCart
              numberOfItemsInCart={numberOfItemsInCart}
              setDrawerOpen={setDrawerOpen}
              drawerOpen={drawerOpen}
              userDetails={userDetail}
            />
          </li>
          <li
            className="navItem"
            onClick={() => {
              setloginStatus(false);
              setUserDetails();
              setItemsToCart(0);
              sessionStorage.clear();

              navigate(`/home`);
            }}
          >
            <span className="logoutNavBar">Log out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
