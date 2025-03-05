import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '~/types'
import axiosInstance from '~/utils/axiosInstance'
import { API_ROOT } from '~/utils/contants'

type CurrentUserType = {
  currentUser: UserType | null
}

const initialState: CurrentUserType = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'users/loginUserAPI',
  async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post(`${API_ROOT}/users/login`, data)
    return response.data
  }
)

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUserAPI.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload
    })
  }
})

export const selectCurrentUser = (state: { user: CurrentUserType }) => state.user.currentUser

export default currentUserSlice.reducer
