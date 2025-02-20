import axios from 'axios'
import { BoardType } from '~/types'
import { API_ROOT } from '~/utils/contants'

export const fetchBoardDetailsAPI = async (boardId: string) => {
  const response = await axios.get(`${API_ROOT}/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId: string, newBoard: BoardType) => {
  const response = await axios.put(`${API_ROOT}/boards/${boardId}`, newBoard)
  return response.data
}

export const createColumnAPI = async (data: { title: string; boardId: string }) => {
  const response = await axios.post(`${API_ROOT}/columns`, data)
  return response.data
}

export const createCardAPI = async (data: { title: string; boardId: string; columnId: string }) => {
  const response = await axios.post(`${API_ROOT}/cards`, data)
  return response.data
}
