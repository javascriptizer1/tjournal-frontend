import {AxiosInstance} from 'axios';
import {CreateUserDto, LoginDto, RequestUserData} from "./types";

export const userApi = (instance: AxiosInstance) => ({
    async getAll(): Promise<RequestUserData[]> {
        const {data} = await instance.get<RequestUserData[]>('/users');
        return data;
    },
    async register(dto: CreateUserDto): Promise<RequestUserData> {
        const {data} = await instance.post<RequestUserData>('/auth/register', dto);
        return data;
    },
    async login(dto: LoginDto): Promise<RequestUserData> {
        const {data} = await instance.post<RequestUserData>('/auth/login', dto);
        return data;
    },
    async me(): Promise<RequestUserData> {
        const {data} = await instance.get<RequestUserData>('/users/me');
        return data;
    }
});