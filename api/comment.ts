import {AxiosInstance} from 'axios';
import {CommentType, CreateCommentDto} from "./types";


export const commentApi = (instance: AxiosInstance) => ({
    async getAll(postId?: number) {
        const {data} = await instance.get<CommentType[]>(`/comments`, {params: {postId}});
        return data;
    },
    async getOne(id: number) {
        const {data} = await instance.get<CommentType>(`/comments/${id}`);
        return data;
    },
    async create(dto: CreateCommentDto) {
        const {data} = await instance.post<CreateCommentDto, { data: CommentType }>('/comments', dto);
        return data;
    },
    async update(id: number, dto: CreateCommentDto) {
        const {data} = await instance.patch<CreateCommentDto, { data: CommentType }>(`/comments/${id}`, dto);
        return data;
    },
});