import {useEffect} from "react";

export const ThemeChecker = () => {

    const theme = localStorage.getItem("theme")
    const headerPos = localStorage.getItem("headerPos")

    if(!theme) {
        localStorage.setItem("theme", "lightmode")
        window.location.reload()
    }

    if(!headerPos){
        localStorage.setItem("headerPos", "basic")
        window.location.reload()
    }

    useEffect(() => {
        if (theme) document.documentElement.dataset.theme = theme
    }, [theme])
}