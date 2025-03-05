import { toast } from 'react-toastify'
import { BoardType, ColumnType } from '~/types'
import axiosInstance from '~/utils/axiosInstance'
import { API_ROOT } from '~/utils/contants'

// Move API to Redux/ActiveBoard
// export const fetchBoardDetailsAPI = async (boardId: string) => {
//   const response = await axiosInstance.get(`${API_ROOT}/boards/${boardId}`)
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId: string, newBoard: BoardType) => {
  const response = await axiosInstance.put(`${API_ROOT}/boards/${boardId}`, newBoard)
  return response.data
}

export const createColumnAPI = async (data: { title: string; boardId: string }) => {
  const response = await axiosInstance.post(`${API_ROOT}/columns`, data)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId: string, newColumn: Partial<ColumnType>) => {
  const response = await axiosInstance.put(`${API_ROOT}/columns/${columnId}`, newColumn)
  return response.data
}

export const deleteColumnAPI = async (columnId: string) => {
  const response = await axiosInstance.delete(`${API_ROOT}/columns/${columnId}`)
  return response.data
}

export const moveCardToDifferentAPI = async (data: {
  cardId: string
  prevColumnId: string
  prevCardOrderedIds?: string[]
  nextColumnId: string
  nextCardOrderedIds?: string[]
}) => {
  const response = await axiosInstance.put(`${API_ROOT}/boards/supports/moving_card`, data)
  return response.data
}

export const createCardAPI = async (data: { title: string; boardId: string; columnId: string }) => {
  const response = await axiosInstance.post(`${API_ROOT}/cards`, data)
  return response.data
}

export const registerUserAPI = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(`${API_ROOT}/users/register`, data)
  toast.success('Register successfully! Please check your email to verify your account.', {
    theme: 'colored'
  })
  return response.data
}

export const verifyUserAPI = async (data: { email: string; token: string }) => {
  const response = await axiosInstance.put(`${API_ROOT}/users/verify`, data)
  toast.success('Your account has been verified successfully!', {
    theme: 'colored'
  })
  return response.data
}
