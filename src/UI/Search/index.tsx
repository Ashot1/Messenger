import styles from './Search.module.sass'
import { FC } from 'react'
import {ISearch} from "./Types.ts";

const Search: FC<ISearch> = ({register}) => {
	return (
		<div className={styles.SearchWrapper}>
			<input type="search" className={styles.Search} placeholder="Искать..." autoCorrect="off" {...register("Search")}/>
		</div>
	)
}

export default Search
