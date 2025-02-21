import axios from 'axios'
import { BoardType, ColumnType } from '~/types'
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

export const updateColumnDetailsAPI = async (columnId: string, newColumn: Partial<ColumnType>) => {
  const response = await axios.put(`${API_ROOT}/columns/${columnId}`, newColumn)
  return response.data
}

export const moveCardToDifferentAPI = async (data: {
  cardId: string
  prevColumnId: string
  prevCardOrderedIds?: string[]
  nextColumnId: string
  nextCardOrderedIds?: string[]
}) => {
  const response = await axios.put(`${API_ROOT}/boards/supports/moving_card`, data)
  return response.data
}

export const createCardAPI = async (data: { title: string; boardId: string; columnId: string }) => {
  const response = await axios.post(`${API_ROOT}/cards`, data)
  return response.data
}
