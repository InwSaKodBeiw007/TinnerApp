import mongoose from "mongoose"
import { IPhotoDocument, IPhotoModel } from "../interfaces/photo.interface"
import { photo } from "../types/photo.type"

const schema = new mongoose.Schema<IPhotoDocument, IPhotoModel>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    is_profile_image: { type: Boolean, required: true, default: false },
}, {
    timestamps: { createdAt: 'created_at' },
})

schema.methods.toPhoto = function (): photo {
    return {
        id: this._id.toString(),
        url: this.url,
        public_id: this.public_id,
        is_profile_image: this.is_profile_image,
        create_at: this.created_at,
    }
}
schema.statics.setAvatar = async function (photo_id: string, user_id: string): Promise<boolean> {
    await this.updateMany(
        { user: new mongoose.Types.ObjectId(user_id) },
        { $set: { is_avatar: false } }
    )
    const updatePhoto = await this.findByIdAndUpdate(
        (photo_id),
        { $set: { is_profile_image: true } }
    )
    return !!updatePhoto
}
export const Photo = mongoose.model<IPhotoDocument, IPhotoModel>("Photo", schema)