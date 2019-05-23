export const LOGOUT = 'LOGOUT';
export const SIGNIN = 'SIGNIN';

export function logout(logout){
    return { type: LOGOUT, logout }
}

export function signIn(user){
    return { type: SIGNIN, user }
}