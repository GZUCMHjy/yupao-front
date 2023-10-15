import { UserType } from "./user";

// 队伍信息类别
export type TeamType = {
    description: string,
    expireTime?: Date ,
    maxNum: number,
    name: string,
    password?:string,
    // todo 定义枚举值更规范
    status: number,
    id: number,
    userId: number,
    createTime: Date,
    updateTime: Date,
    createUser?: UserType,
    hasJoinNum?: number
  };