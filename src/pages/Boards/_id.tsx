import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentAPI } from '~/apis'
import { CardType, ColumnType } from '~/types'
import { fetchBoardDetailsAPI, selectActiveBoard, updateActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { cloneDeep } from 'lodash'

const Board: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const board = useSelector(selectActiveBoard)

  // Xử lý sau khi kéo thả column ở event DragEnd
  const handleMoveColums = (orderedColumns: ColumnType[]) => {
    if (board) {
      const orderedColumnsIds = orderedColumns.map(column => column._id)

      const newBoard = cloneDeep(board)
      newBoard.columns = orderedColumns
      newBoard.columnOrderIds = orderedColumnsIds
      dispatch(updateActiveBoard(newBoard))

      // Update API
      updateBoardDetailsAPI(board._id, newBoard)
    }
  }

  // Xử lý sau khi kéo thả card trong cùng 1 column ở event DragEnd
  const handleMoveCardInTheSameColumn = (orderedCards: CardType[], orderedCardIds: string[], columnId: string) => {
    if (board) {
      const newBoard = cloneDeep(board)
      const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
      if (columnToUpdate) {
        columnToUpdate.cards = orderedCards
        columnToUpdate.cardOrderIds = orderedCardIds
        // Update board state
        dispatch(updateActiveBoard(newBoard))
        // Update API
        updateColumnDetailsAPI(columnId, { cardOrderIds: orderedCardIds })
      }
    }
  }

  const handleMoveCardToDifferentColumn = (
    prevColumnId: string,
    nextColumnId: string,
    cardId: string,
    orderedColumns: ColumnType[]
  ) => {
    if (board) {
      const orderedColumnsIds = orderedColumns.map(column => column._id)

      const newBoard = cloneDeep(board)
      newBoard.columns = orderedColumns
      newBoard.columnOrderIds = orderedColumnsIds
      dispatch(updateActiveBoard(newBoard))

      // Update API
      moveCardToDifferentAPI({
        cardId,
        prevColumnId,
        prevCardOrderedIds: orderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds,
        nextColumnId,
        nextCardOrderedIds: orderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
      })
    }
  }

  useEffect(() => {
    const boardId = '67b3f30391d98682ed4db77f' // Temporarily hardcoded
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {board && <BoardBar board={board} />}
      {board && (
        <BoardContent
          board={board}
          moveColums={handleMoveColums}
          moveCardInTheSameColumn={handleMoveCardInTheSameColumn}
          moveCardToDifferentColumn={handleMoveCardToDifferentColumn}
        />
      )}
    </Container>
  )
}

export default Board
