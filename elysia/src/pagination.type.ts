import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    currentPage: t.Number(),
    pageSize: t.Number(),
    length: t.Optional(t.Number()),
})

export type pagination = Static<typeof _pagination>

export function CreatePagination<T extends TSchema,U extends TSchema>(itemType: T,paginationType:U) {
    return t.Object({
        data: t.Array(itemType),
        pagination: paginationType
    })
}