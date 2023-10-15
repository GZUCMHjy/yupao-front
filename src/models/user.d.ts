// 用户信息类别
export type UserType = {
    id?: number;
    username?:string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    isValid?: number;
    profile?: string;
    account?: string;
    email?: string;
    createTime?: Date;
    // updateTime?: Date;
    isDelete?: number;
    userRole?: number;
    planetCode?: string;
    tags?: string
  };