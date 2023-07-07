export const useLocaleDate = () => (date: string) => new Date(date).toLocaleString('ru')

export const useFormatDate = () => (date: string) => {
    const NewDate = date.split('.')
    return `${NewDate[1]}/${NewDate[0]}/${NewDate[2]}`
}