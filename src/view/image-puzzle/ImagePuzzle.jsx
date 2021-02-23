import {useEffect, useState} from "react";
import img from "./lamborghini_square.jpg";
import LevelOption from "../../component/LevelOption";
import PuzzleGame from "../../component/PuzzleGame";
import "./ImagePuzzle.css";

const levelEasy = {
	name: "Dễ",
	size: 3
};
const levelMedium = {
	name: "Trung Bình",
	size: 4
};
const levelHard = {
	name: "Khó",
	size: 6
};

const levels = [levelEasy, levelMedium, levelHard];

const moveAudio = new Audio();
const wonAudio = new Audio();
const ImagePuzzle = () => {
	const [level, setLevel] = useState(levelEasy);
	const handleLevelChange = (selectedLevel) => {
		setLevel(selectedLevel);
	};

	useEffect(
		() => {
			moveAudio.src = "https://docs.google.com/uc?export=download&id=1YxRxucJL0fSHYdIparyhr4b2TNVQXjWx";
			wonAudio.src = "https://docs.google.com/uc?export=download&id=19wy1sEG4HwXsxEga2uL6fxS6jjvNo2uq";

		},
		[]);

	const onMove = () => {
		if (moveAudio) {
			moveAudio.currentTime = 0;
			moveAudio.play();
		}
	}

	const onWon = () => {
		if (wonAudio) {
			wonAudio.currentTime = 0;
			wonAudio.play();
		}
	}
	return (
		<div className="image__puzzle__container">
			<div className="image__puzzle__top">
				<LevelOption levels={levels} onSelect={handleLevelChange}/>
			</div>
			<div>
				<PuzzleGame onMove={onMove} onWon={onWon} size={level.size} imageSrc={img}/>
			</div>
			<div className="image__puzzle__bottom"/>
		</div>
	);
}

export default ImagePuzzle;
