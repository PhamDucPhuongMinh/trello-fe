import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
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

export const logoutUserAPI = createAsyncThunk('users/logoutUserAPI', async (showSuccessMessage: boolean = true) => {
  const response = await axiosInstance.delete(`${API_ROOT}/users/logout`)
  if (showSuccessMessage) {
    toast.success('Logout successfully!')
  }
  return response.data
})

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUserAPI.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload
    })
    builder.addCase(logoutUserAPI.fulfilled, state => {
      state.currentUser = null
    })
  }
})

export const selectCurrentUser = (state: { user: CurrentUserType }) => state.user.currentUser

export default currentUserSlice.reducer
