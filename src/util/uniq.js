export const UniqId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
}