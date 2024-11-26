import mongoose, { Query, RootFilterQuery } from "mongoose"
import { updateProfile, user, userPagination, userPaginator } from "../user.type"
import { IUSERDocument } from "../interfaces/user.interface"
import { QueryHelper } from "../helpers/query.helper"

export const UserService = {
    get: function (pagination: userPagination, user_id: string): Promise<userPaginator> {
        let filter: RootFilterQuery<IUSERDocument> = {
            _id: { $nin: new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
        throw new Error('not implement')
    },
    getByUserName: function (username: string): Promise<user> {
        //todo: not implement
        throw new Error('not implement')
    },
    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        //todo: not implement
        throw new Error('not implement')
    }
}