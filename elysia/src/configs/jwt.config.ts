import jwt from "@elysiajs/jwt";

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'dasdnfkew',
    exp: '1d'
})
// export const jwtrr = jwt({
//     name: `jwt`,
//     secret: `dasdnfkew`,
//     exp: `1d`
// })