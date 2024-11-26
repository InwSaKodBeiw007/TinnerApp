import Elysia, { Static, t } from "elysia"
import { _pagination, CreatePagination } from "./pagination.type"

export const _register = t.Object({
    username: t.String(),
    password: t.String(),
    display_name: t.String(),
    date_of_birth: t.Optional(t.Date()),
    looking_for: t.Union([t.Literal('male'),t.Literal('female'),t.Literal('all')]),
    gender:t.Optional( t.Union([t.Literal('male'),t.Literal('female'),t.Literal('all')]))
})
export const _profile = t.Object({
    ...t.Omit(_register,['password']).properties,
    id: t.String(),
    introduction: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.Date()),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date())

    //todo: implement upload feature
    //photo: photo_id[]
})

export const _user = t.Object({
    ..._profile.properties,
    //todo: implement like feature
    //followers: profile[]
    //followering: profile[]
})

const _userPagination = t.Object({
    ..._pagination.properties,
    username: t.Optional(t.String()),
    min_age: t.Optional(t.Number()),
    max_age: t.Optional(t.Number()),
    looking_for: t.Optional(t.Union([t.Literal('male'),t.Literal('female'),t.Literal('all')])),
})
export const _updateProfile = t.Omit(_profile,['id','username','updated_at','created_at','last_active','gender','age'])
export const _userPaginator = CreatePagination(_user,_userPagination)

export const UserDto = new Elysia().model({
    pagination: t.Optional(_userPagination),
    updateProfile: _updateProfile,
    users: _userPaginator,
    user: _user
})

export type updateProfile = Static<typeof _updateProfile>
export type userPagination = Static<typeof _userPagination>
export type userPaginator = Static<typeof _userPaginator>
export type user = Static<typeof _user>
