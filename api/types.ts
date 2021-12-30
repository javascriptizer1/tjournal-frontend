import {OutputData} from "@editorjs/editorjs";

export type RequestUserData = {
    fullName: string,
    email: string,
    id: number,
    createdAt: string,
    updatedAt: string,
    commentsCount?: number;
    token: {
        access_token: string
    }
};

export type CreateUserDto = {
    fullName: string;
    email: string;
    password: string;
};

export type LoginDto = Omit<CreateUserDto, 'fullName'>;

export type PostType = {
    id: number;
    title: string;
    body: OutputData['blocks'];
    description: string;
    user: RequestUserData;
    tags: null | string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export type CreatePostDto = {
    title: string;
    body: OutputData['blocks']
}

export type CommentType = {
    id: number;
    text: string;
    post: PostType;
    user: RequestUserData;
    createdAt: string;
    updatedAt: string;
}


export type CreateCommentDto = {
    postId: number;
    text: string;
}

export enum PostViewsEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}

export class SearchPostDto {
    title?: string;
    body?: string;
    views?: PostViewsEnum;
    limit?: number;
    offset?: number;
    tag?: string;
}
