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
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const board = useSelector(selectActiveBoard)
  const { boardId } = useParams()

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
    if (boardId) {
      dispatch(fetchBoardDetailsAPI(boardId))
    }
  }, [boardId, dispatch])

  if (!board) {
    return <PageLoadingSpinner caption="Loading board..." />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        moveColums={handleMoveColums}
        moveCardInTheSameColumn={handleMoveCardInTheSameColumn}
        moveCardToDifferentColumn={handleMoveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
