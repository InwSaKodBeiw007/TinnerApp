import Elysia from "elysia";
import { AuthMiddleWare } from "../middlewares/auth.middleware";

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(AuthMiddleWare)
    .get('/all', () => {
        return {
            text: "Hello word"
        }
    },{
        isSignIn:true
    })