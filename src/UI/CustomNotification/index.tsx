import toast from "react-hot-toast";

const CustomNotification = (text: string, type: string = 'success') => {

	if(type === 'error')
		return toast.error(text, {style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}})

	if(type === 'success') return (
		toast.success(text, {style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}})
	)
}

export default CustomNotification
