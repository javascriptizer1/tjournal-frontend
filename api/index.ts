import axios from "axios";
import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import {userApi} from "./user";
import {postApi} from "./post";
import {commentApi} from "./comment";


export type ApiReturnType = {
    user: ReturnType<typeof userApi>,
    post: ReturnType<typeof postApi>,
    comment: ReturnType<typeof commentApi>,
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.authToken;
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: 'Bearer ' + token
        },
    });

    return {
        user: userApi(instance),
        post: postApi(instance),
        comment: commentApi(instance),
    }
}