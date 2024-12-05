export interface User{
    email:string,
    password:string,
}
export interface UserForApi{
    accessToken:string,
    email: string,
    username: string,
    _id: string
}