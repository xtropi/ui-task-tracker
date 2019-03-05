export const auth = (authData) => {
    return {
        type: 'AUTH',
        authData: authData
    }
}