export interface IBurgerButton {
    dopClass?: string,
    isActive: boolean,
    customActiveClass?: string,
    onclick: () => void,
    isLoading?: boolean
}
