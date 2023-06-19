import {useEffect} from "react";

export const ThemeChecker = () => {

    const theme = localStorage.getItem("theme")

    if(!theme) {
        localStorage.setItem("theme", "darkmode")
        window.location.reload()
    }

    useEffect(() => {
        if (theme) document.documentElement.dataset.theme = theme
    }, [theme])
}