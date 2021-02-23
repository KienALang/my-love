import {useEffect, useState} from "react";
import {useKeyPress} from "../reuseHooks";
import PartialImage from "./PartialImage";
import "./PuzzleGame.css";
import emptyImage from "./empty.png";

const randomInt = (minInclusive, maxInclusive) => {
	return (
		Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive
	);
};

const randomContinuousIntArray = (size = 3) => {
	const arr = [0];
	const arrSize = size * size;
	while (arr.length < arrSize) {
		const rand = randomInt(1, arrSize - 1);
		if (!arr.some((value) => value === rand)) {
			arr.push(rand);
		}
	}
	return arr;
};

const maxBox = 600;
const boxSize = {
	width: maxBox,
	height: maxBox,
};

const PuzzleGame = ({size, imageSrc, onMove, onWon}) => {
	let prevPuzzle = randomContinuousIntArray(size);
	const [puzzleArr, setPuzzleArr] = useState(prevPuzzle);
	const [emptyPuzzle, setEmptyPuzzle] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [won, setWon] = useState(false);

	const isUpKeyPress = useKeyPress("ArrowUp");
	const isDownKeyPress = useKeyPress("ArrowDown");
	const isRightKeyPress = useKeyPress("ArrowRight");
	const isLeftKeyPress = useKeyPress("ArrowLeft");
	const isEnterPress = useKeyPress("Enter");

	useEffect(() => {
		const isWon = puzzleArr.every((value, index) => value === index);
		if (isWon) {
			onWon();
			setWon(true);
			setIsPlaying(false);
		}
	}, [puzzleArr]);

	useEffect(
		() => {
			if (!isPlaying) {
				setIsPlaying(true);
			}
		},
		[isEnterPress]
	);

	useEffect(() => {
		if (!isPlaying) {
			return;
		}
		let direction = 0;
		if (isDownKeyPress) {
			direction = -size;
		} else if (isUpKeyPress) {
			direction = size;
		} else if (isLeftKeyPress) {
			direction = 1;
		} else if (isRightKeyPress) {
			direction = -1;
		}

		const zeroIndex = puzzleArr.findIndex((value) => value === 0);
		const nextIndex = zeroIndex + direction;
		if (nextIndex % size === 0 && zeroIndex + 1 === nextIndex) {
			return;
		}
		if (nextIndex % size === size - 1 && zeroIndex - 1 === nextIndex) {
			return;
		}

		if (direction && nextIndex >= 0 && nextIndex < size * size) {
			onMove();
			const newArr = [...puzzleArr];
			newArr[zeroIndex] = newArr[nextIndex];
			newArr[nextIndex] = 0;
			setPuzzleArr(newArr);
		}
	}, [isDownKeyPress, isUpKeyPress, isLeftKeyPress, isRightKeyPress]);

	useEffect(
		() => {
			setPuzzleArr(randomContinuousIntArray(size));
			setIsPlaying(false);
			setWon(false);
			setEmptyPuzzle(undefined);
		},
		[size]
	);

	if (!puzzleArr || puzzleArr.length < 3 * 3 - 1 || !imageSrc) {
		return null;
	}

	const onReplayClick = () => {
		setPuzzleArr(prevPuzzle);
		setIsPlaying(false);
	};

	const partialContainerStyle = () => ({
		width: maxBox / size,
		height: maxBox / size,
		border: isPlaying ? undefined : "1px solid #d5d5d5"
	});

	const getPartialImageStyle = (imageIndex, keyIndex) => {
		return {
			zIndex: size * size - keyIndex,
			left: `-${(imageIndex % size) * 100}%`,
			top: `-${Math.floor(imageIndex / size) * 100}%`
		};
	};

	const onPlayClick = () => {
		if (!isPlaying) {
			setIsPlaying(true);

			if (won) {
				prevPuzzle = randomContinuousIntArray(size);
				setPuzzleArr(prevPuzzle);
				setWon(false);
			}
		}
	};

	const coverStyle = {
		...boxSize,
		zIndex: size * size
	};

	const handlePuzzleClick = (puzzleIndex) => {
		if (!emptyPuzzle) {
			setEmptyPuzzle(puzzleIndex);
		}
	}

	return (
		<div className="puzzle__game__container">
			<div className="empty__puzzle">
				<PartialImage
					imageSize={maxBox}
					imageSrc={emptyPuzzle ? imageSrc : emptyImage}
					style={partialContainerStyle()}
					imgStyle={emptyPuzzle ? getPartialImageStyle(emptyPuzzle, size * size) : undefined}
				/>
			</div>
			{!isPlaying && (
				<p className="puzzle__game__cover__title">{won ? "Thắng rồi zê zê" : "Ưng bóc bỏ tạm miếng nào?"}</p>
			)}
			<div className="puzzle__game__image__unordered" style={boxSize}>
				{[...(isPlaying ? puzzleArr : Array(size * size).keys())].map((item, index) => {
					return (
						<PartialImage
							imageSize={maxBox}
							imageSrc={imageSrc}
							style={partialContainerStyle()}
							imgStyle={getPartialImageStyle(item, index)}
							onClick={() => handlePuzzleClick(item)}
							key={item}
						/>
					);
				})}
			</div>
			{
				isPlaying && (
					<div>
						<input type="button" value="Chơi lại" onClick={onReplayClick}/>
						<input type="button" value="Random cái khác đi" onClick={onPlayClick}/>
					</div>
				)
			}
		</div>
	);
};

export default PuzzleGame;
