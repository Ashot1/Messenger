import styles from './ProfilePosts.module.sass'
import {FC} from 'react'
import ProfileCreatePost from "../../ENTITY/ProfileCreatePost";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {IProfilePosts} from "./Types.ts";
import {useAppDispatch, useLocaleDate} from "../../HOOK";
import PromiseNotification from "../../UI/PromiseNotification";
import {changePosts} from "../../STORE/userSlice.ts";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import deleteIcon from '../../ASSET/icon-delete.png'
// import editIcon from '../../ASSET/icon-edit.png'
import BorderedButton from "../../UI/BorderedButton";


const ProfilePosts: FC<IProfilePosts> = ({id, User, Loading, currentUserID}) => {

	const getDate = useLocaleDate(),
		dispatch = useAppDispatch()

	const createPost = async (e: any) => {
		e.preventDefault()
		if(currentUserID !== id) return
		const title = e.target[0].value,
			content = e.target[1].value,
			date = new Date,
			localeDate = getDate(date.toString())

		PromiseNotification({
			mainFunction: async () => {
				if(!User?.posts) return Promise.reject(new Error('Пользователь не найден'))
				await updateDoc(doc(db, "Users", id), {
					posts: [...User.posts, {title: title, content: content, createAt: localeDate}]
				})
			},
			successFunction: () => <b>Пост успешно опубликован</b>
		})
			.then(() => {
				if(User?.posts) return dispatch(changePosts({posts: [...User?.posts, {title: title, content: content, createAt: localeDate}]}))
				dispatch(changePosts({posts: [{title: title, content: content, createAt: localeDate}]}))
			})

	}

	const deletePost = (post: {title: string, content: string, createAt: string}) => {
		if(currentUserID !== id) return
		if(!User?.posts) return
		const filteredPosts = User.posts.filter(item => item !== post)

		PromiseNotification({
			mainFunction: async () => {
				await updateDoc(doc(db, "Users", id), {
					posts: filteredPosts
				})
			},
			successFunction: () => <b>Пост удален</b>
		})
			.then(() => {
				dispatch(changePosts({posts: filteredPosts}))
			})
	}

	if(Loading) return (
		<div className={styles.PostsWrapper}>
			<h1 className={styles.PostTitle}>Посты</h1>
			<ProfileCreatePost createPost={createPost}/>
			<SettingsDefaultBlock>
				<div className={styles.titlePostWrapper}>
					<h1 className={styles.LoadingText}>Заголовок</h1>
					<span className={styles.LoadingText} style={{marginTop: '15px'}}>
						13.07.2023, 8:28:10
					</span>
				</div>
				<p className={`${styles.PostContent} ${styles.LoadingText}`}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto beatae cupiditate, deserunt doloremque inventore laboriosam laborum maiores molestiae necessitatibus obcaecati optio perferendis perspiciatis provident, quasi repellendus sapiente voluptas voluptates.
				</p>
			</SettingsDefaultBlock>
			<SettingsDefaultBlock>
				<div className={styles.titlePostWrapper}>
					<h1 className={styles.LoadingText}>Заголовок</h1>
					<span className={styles.LoadingText} style={{marginTop: '15px'}}>
						13.07.2023, 8:28:10
					</span>
				</div>
				<p className={`${styles.PostContent} ${styles.LoadingText}`}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto beatae cupiditate, deserunt doloremque inventore laboriosam laborum maiores molestiae necessitatibus obcaecati optio perferendis perspiciatis provident, quasi repellendus sapiente voluptas voluptates.
				</p>
			</SettingsDefaultBlock>
		</div>
	)

	return (
		<div className={styles.PostsWrapper}>
			<h1 className={styles.PostTitle}>Посты</h1>
			{currentUserID === id && <ProfileCreatePost createPost={createPost}/>}

			{User?.posts && User.posts.length < 1 &&
				<SettingsDefaultBlock><p style={{width: '100%', display: 'flex', justifyContent: 'center'}}>Постов нет</p></SettingsDefaultBlock>}

			{User?.posts.map((post, index) => (
				<SettingsDefaultBlock key={index}>
					{currentUserID === id && <nav className={styles.PostActions}>
						<BorderedButton reversed dopClass={styles.ActionButton} click={() => deletePost(post)} BGColor="#aea7a9">
							<img src={deleteIcon} alt="Удалить"/>
						</BorderedButton>
						{/*<BorderedButton reversed dopClass={styles.ActionButton}>
							<img src={editIcon} alt="Редактировать"/>
						</BorderedButton>*/}
					</nav>}

					<div className={styles.titlePostWrapper}>
						<h1>{post.title}</h1>
						<span>{post.createAt}</span>
					</div>
					<p className={styles.PostContent}>
						{post.content}
					</p>
				</SettingsDefaultBlock>
			))}

		</div>
	)
}


export default ProfilePosts
