import mongoose from "mongoose";
import { register } from "../types/account.type";
import { user } from "../types/user.type";

type userWithOutID = Omit<user,'id'>

export interface IUSERDocument extends mongoose.Document, userWithOutID {
    password_hash: string

    //todo 2 function
    verifyPassword:(password: string) => Promise<boolean>
    toUser: () => user
}

export interface IUSERModel extends mongoose.Model<IUSERDocument> { 
    createUser: (registerData: register) => Promise<IUSERDocument>
}