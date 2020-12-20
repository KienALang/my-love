import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./App.css";

const heartClassNameIcon = "heart-icon";
const heartColor = "#ff4081";

function App() {
  const [showGift, setShowGift] = useState(false);

  const onHeartClick = () => {
    setShowGift(!showGift);
  };

  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon
          className={[
            heartClassNameIcon,
            showGift ? "heart-hidden" : "heart-explode",
          ].join(" ")}
          icon={faHeart}
          color={heartColor}
          size="8x"
        />
        <FontAwesomeIcon
          className={[
            heartClassNameIcon,
            showGift ? "heart-hidden" : "heart-explode-small",
          ].join(" ")}
          icon={faHeart}
          color={heartColor}
          size="8x"
        />
        <FontAwesomeIcon
          className={[heartClassNameIcon, showGift ? "open-gift" : ""].join(
            " "
          )}
          icon={faHeart}
          color={heartColor}
          size="8x"
          onClick={onHeartClick}
        />
        <p className="heart-title">{showGift ? "Gift" : "My Darling"}</p>
      </header>
    </div>
  );
}

export default App;
