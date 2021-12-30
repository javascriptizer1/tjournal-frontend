import {AxiosInstance} from 'axios';
import {CreatePostDto, PostType, SearchPostDto} from "./types";

export const postApi = (instance: AxiosInstance) => ({
    async getAll() {
        const {data} = await instance.get<PostType[]>('/posts');
        return data;
    },
    async search(title: string) {
        const {data} = await instance.get<{ posts: PostType[], total: number }>('/posts/search', {params: {title}});
        return data;
    },
    async getOne(id: number) {
        const {data} = await instance.get<PostType>(`/posts/${id}`);
        return data;
    },
    async create(dto: CreatePostDto) {
        const {data} = await instance.post<CreatePostDto, { data: PostType }>('/posts', dto);
        return data;
    },
    async update(id: number, dto: CreatePostDto) {
        const {data} = await instance.patch<CreatePostDto, { data: PostType }>(`/posts/${id}`, dto);
        return data;
    },
});