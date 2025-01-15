import mongoose from "mongoose"
import { User } from "../Model/user.model"
import { QueryHelper } from "../helpers/query.helper"
import { userPagination, userPaginator, user } from "../types/user.type"

export const LikeService = {
    toggleLike: async function (user_id: string, target_id: string): Promise<boolean> {
        const target = await User.findById(target_id).select("_id").exec()
        if (!target)
            throw new Error("Invalid HugeJackMan//target_id")

        const likeTarget = await User.findOne({
            _id: new mongoose.Types.ObjectId(user_id),
            following: { $elemMatch: { $eq: target._id } }
        }).exec()

        if (likeTarget) {
            await User.findByIdAndUpdate(user_id, { $pull: { following: target_id } })

            await User.findByIdAndUpdate(target_id, { $pull: { followers: user_id } })
        } else {
            await User.findByIdAndUpdate(user_id, { $addToSet: { following: target_id } })

            await User.findByIdAndUpdate(target_id, { $addToSet: { followers: user_id } })
        }
        return true
    },
    getFollowers: async function (user_id: string, pagination: userPagination): Promise<userPaginator> {
        const followerDoc = User.findById(user_id)
            .populate({
                path: "followers",
                match: { $and: QueryHelper.parseUserQuery(pagination) },
                select: '_id username display_name photos introduction interest location gender date_of_birth',
                populate: { path: "photos" }
            })
        const [docs, total] = await Promise.all([
            followerDoc.exec(),
            User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
                {$project:{total:{$size:{$ifNull:["$followers",[]]}}}}
            ])
        ])
        pagination.length = total[0].count
        let follower: user[] = []
        if(docs){
            follower = docs.followers as user[]
        }
        return {
            data: follower,
            pagination: pagination,
        }
    },
    getFollowing: async function (user_id: string, pagpokpok: userPagination): Promise<userPaginator> {
        const query = User.findById(user_id)
        .populate({
            path: "following",
            match: { $and: QueryHelper.parseUserQuery(pagpokpok) },
            select: '_id username display_name photos introduction interest location gender date_of_birth',
            populate: { path: "photos" }
        })
    const [docs, total] = await Promise.all([
        query.exec(),
        User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
            {$project:{total:{$size:{$ifNull:["$followers",[]]}}}}
        ])
    ])
    pagpokpok.length = total[0].count
    let following: user[] = []
    if(docs){
        // following = docs.following as user[]
        following = docs.toUser()['following'] as user[]
    }
    return {
        data: following,
        pagination: pagpokpok,
    }
    },
}