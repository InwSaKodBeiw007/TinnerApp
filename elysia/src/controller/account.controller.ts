import Elysia from "elysia";
import { AccountDto } from "../account.type";
import { AccountService } from "../service/account.service";
import { jwtConfig } from "../configs/jwt.config";

export const AccountController = new Elysia({
    prefix: '/api/account',
    tags: ['Account']
})
    .use(AccountDto)
    .use(jwtConfig)
    
    .post('/login', async ({body,set,jwt}) => {
        try {
            const user = await AccountService.login(body)
            const token = await jwt.sign({id: user.id})
            return {user,token}
        } catch (error) {
            set.status = "Bad Request"
            if(error instanceof Error)
                throw error
            set.status = 500
            throw new Error("Something went wrong, try again later")
        }
    },{
        detail:{summary:"Login"},
        body:"login",
        response:"user_and_token"
    })
    // .post(`/login` ,async (jwt,body,set) => {
    //     try {
    //       const user = await AccountService.login(body)
    //       const token = await jwt.sign({id: user.id})
    //       return {user, token}
    //     } catch (error) {
    //       set.status = "Bad Request"
    //       if (error instanceof Error) 
    //         throw error
    //       set.status = 500
    //       throw new Error("Something went wrong, try again later")
    //     }
    //    },{
    //     detail:{summary:"Login"},
    //     body:"login",
    //     response:"user_and_token",
    //   })
    
    .post(`/register`,async ({jwt,body,set}) => {
        try {
            const user = await AccountService.createNewUser(body)
            const token = await jwt.sign({id:user.id})
            return {token,user}
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error("Something went wrong, try again later")
        }
    },{
        body: "register",
        response: "user_and_token",
        detail: {
            summary: "Create new user"
        },
        beforeHandle: ({ body: { username, password }, set }) => {
            const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,9}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
            if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
                set.status = "Bad Request"
                throw new Error(`Invalid username or password`)
            }
        },
    })