// 最简单存储中间态（放入缓存，提高性能）
import {UserType} from "../models/user"
let currentUser: UserType
const setCurrentUserState = (user:UserType) =>{
    currentUser = user;
}
 const getCurrentUserState = (): UserType=>{
    return currentUser;
 }

 export {
    setCurrentUserState,
    getCurrentUserState,
 }