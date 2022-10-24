import { Slider } from "../Slider/Slider";
import "./Home.css";

export function Home() {
  return (
    <div className="homepage minHeightClass">
      <h1 className="homeTitle">
        Welcome to D<span className="logoName">&</span>T
        <span className="logoName"> Game</span>Store
      </h1>

      <br />
      <h1 className="title">Our Games</h1>
      <Slider />
    </div>
  );
}
