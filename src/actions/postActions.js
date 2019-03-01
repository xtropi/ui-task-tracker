export const auth = (isLoggedIn) => {
    return {
        type: 'AUTH',
        isLoggedIn: isLoggedIn
    }
}