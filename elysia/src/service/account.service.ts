import { login, register } from "../account.type";
import { User } from "../Model/user.model";
import { user } from "../user.type";

export const AccountService = {
    login: async function(loginData: login): Promise<user>{
        const user = await User.findOne({username:loginData.username}).exec()
        if (!user)
            throw new Error("This user has no longer in this world")
        const verifyPassword = await user.verifyPassword(loginData.password)
        if(!verifyPassword)
            throw new Error("Password is incorrect")
        return user.toUser()
    },

    createNewUser: async function (registerData: register): Promise<user>{
        const user = await User.findOne({username:registerData.username}).exec()
        if(user)
            throw new Error(`Your Name " ${registerData.username} " Same with the God `)
        const newUser = await User.createUser(registerData)
        return newUser.toUser()
    }
}