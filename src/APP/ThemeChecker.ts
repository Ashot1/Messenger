import {useEffect} from "react";

export const ThemeChecker = () => {

    const theme = localStorage.getItem("theme"),
        headerPos = localStorage.getItem("headerPos"),
        menuStyle = localStorage.getItem("menuStyle")

    if (!theme) {
        localStorage.setItem("theme", "lightmode")
    }

    if (!headerPos) {
        localStorage.setItem("headerPos", "basic")
    }

    if (!menuStyle) {
        localStorage.setItem("menuStyle", "top")
    }

    if (!theme || !menuStyle || !headerPos) window.location.reload()

    useEffect(() => {
        if (theme) document.documentElement.dataset.theme = theme
    }, [theme])
}