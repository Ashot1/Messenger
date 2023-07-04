import styles from "./WaveButton.module.sass";
import {FC} from "react";
import {ICustomCSS, IWaveButton} from "./Types.ts";

const WaveButton: FC<IWaveButton> = ({onclick,
										 children,
										 color = 'rgb(196, 137, 59)',
										 dopClass}) => {

	return (
		<button className={`${styles.button2} ${dopClass}`} onClick={onclick} style={{"--Color": color} as ICustomCSS}>
			{children}
		</button>
	);
}
export default WaveButton
export type {ICustomCSS}