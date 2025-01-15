import cors from "@elysiajs/cors"
import Elysia from "elysia"
import { MongoDB } from "./configs/database.config"
import { jwtConfig } from "./configs/jwt.config"
import { swaggerConfig } from "./configs/swagger.config"
import { tlsConfig } from "./configs/tls.config"
import { AccountController } from "./controller/account.controller"
import { UserController } from "./controller/user.controller"
import { AccountDto } from "./types/account.type"
import { LikeController } from "./controller/like.controller"
import { PhotoController } from "./controller/photo.controller"
import staticPlugin from "@elysiajs/static"

MongoDB.connect()

const app = new Elysia()
  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfig)
  // .use(AccountDto)
  // .use(example)
  .use(AccountController)
  .use(UserController)
  .use(LikeController)
  .use(PhotoController)
  .use(staticPlugin({
    assets: "public/uploads", //โดยdefault มันเป็น public อยู่แล้ว
    prefix: "img"
  }))

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })
  // Bun.serve({
  //   ...app,
  //   // timeout in 60s
  //   idleTimeout: 60
  // })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
