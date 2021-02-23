import "./GameLayout.css";
import ImagePuzzle from "./image-puzzle/ImagePuzzle";

const GameLayout = (props) => {
	return (
		<div className="game__layout__container">
			<div className="game__layout__content">
				<ImagePuzzle/>
			</div>
			<div className="game__layout__nav">
				<p className="game_option">
					Ưng thêm game khác thì vô vọc code chung nha.<br/>
					<i>Mình update game từ từ</i>
				</p>
			</div>
			<div className="game__layout__side__bar">
				<p className="game_option">Tiến bộ hay không thì nhìn đây này:</p>
			</div>
		</div>
	);
}

export default GameLayout;
