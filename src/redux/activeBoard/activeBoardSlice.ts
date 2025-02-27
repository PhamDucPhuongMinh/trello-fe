import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import { BoardType } from '~/types'
import { mapOrder } from '~/utils'
import axiosInstance from '~/utils/axiosInstance'
import { API_ROOT } from '~/utils/contants'
import { generatePlaceholcerCard } from '~/utils/formatter'

type ActiveBoardType = {
  activeBoard: BoardType | null
}

const initialState: ActiveBoardType = {
  activeBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk('activeBoard/fetchBoardDetails', async (boardId: string) => {
  const response = await axiosInstance.get(`${API_ROOT}/boards/${boardId}`)
  return response.data
})

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateActiveBoard: (state, action: PayloadAction<BoardType>) => {
      state.activeBoard = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action: PayloadAction<BoardType>) => {
      // action.payload is the response.data from the fetchBoardDetailsAPI
      const board = action.payload

      // Sắp xếp lại column theo columnOrderIds
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      // Thêm card rỗng vào column nếu column không có card để có thể kéo thả card vào column
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholcerCard(column)]
          column.cardOrderIds = [generatePlaceholcerCard(column)._id]
        } else {
          // Sắp xếp lại card theo cardOrderIds
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      state.activeBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateActiveBoard } = activeBoardSlice.actions

export const selectActiveBoard = (state: { activeBoard: ActiveBoardType }) => state.activeBoard.activeBoard

export default activeBoardSlice.reducer
