import axios from 'axios'
import { API_ROOT } from '~/utils/contants'

export const fetchBoardDetailsAPI = async (boardId: string) => {
  const response = await axios.get(`${API_ROOT}/boards/${boardId}`)
  return response.data
}
