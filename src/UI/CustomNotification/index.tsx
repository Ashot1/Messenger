import toast from "react-hot-toast";

const CustomNotification = (text: string) => {
	return (
		toast.success(text, {style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}})
	)
}

export default CustomNotification
