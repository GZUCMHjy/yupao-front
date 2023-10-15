import myAxios from "../plugins/myAxios";
import { setCurrentUserState } from "../states/user";

export const getCurrentUser = async ()=>{

    // const currentUser = getCurrentUserState();
    // if(currentUser){
    //     return currentUser;
    // }
    // 不存在再从后端获取数据
    const res = await myAxios.get('/user/current');
    if(res.code === 0 ){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
