import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../index';
import {RequestUserData} from "../../api/types";
import {HYDRATE} from "next-redux-wrapper";

export interface UserState {
    data: RequestUserData | null;
}

const initialState: UserState = {
    data: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<RequestUserData>) => {
            state.data = action.payload
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.data = action.payload.user.data;
        }
    }
})

export const { setUserData } = userSlice.actions


export const selectUserData = (state: AppState) => state.user.data;


export default userSlice.reducer