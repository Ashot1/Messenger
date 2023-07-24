export const CreateBrowserNotification = ({Icon, Body}: {Icon: string, Body: string}) => {
    if(Notification.permission === 'granted') {
        new Notification('Messenger', {
            icon: Icon,
            body: Body,
            lang: 'RU',
            badge: Icon,
            vibrate: 200,
        })
    }
}