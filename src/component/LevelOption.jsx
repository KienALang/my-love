import * as React from "react";

const LevelOption = ({levels, onSelect}) => {
	const handleOnChange = evt => {
		onSelect(levels[evt.target.value]);
	};
	return (
		<div>
			<label htmlFor="levels">Độ Khó</label>
			<select name="levels"  onChange={handleOnChange}>
				{
					levels.map((level, index) => {
						return (
							<option key={level.name} value={index}>{level.name}</option>
						);
					})
				}
			</select>
		</div>
	);
}

export default LevelOption;
