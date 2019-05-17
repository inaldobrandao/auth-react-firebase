export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

export function logout(logout){
    return { type: LOGOUT, logout }
}

export function login(user){
    return { type: LOGIN, user }
}