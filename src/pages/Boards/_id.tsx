import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {
  createColumnAPI,
  fetchBoardDetailsAPI,
  createCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentAPI,
  deleteColumnAPI
} from '~/apis'
import { BoardType, CardType, ColumnType } from '~/types'
import { generatePlaceholcerCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils'
import { toast } from 'react-toastify'

const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardType | null>(null)

  const handleCreateColumn = async (title: string) => {
    if (board) {
      const createdColumn: ColumnType = await createColumnAPI({ boardId: board._id, title })

      // Thêm card rỗng để có thể kéo thả card vào column
      createdColumn.cards = [generatePlaceholcerCard(createdColumn)]
      createdColumn.cardOrderIds = [generatePlaceholcerCard(createdColumn)._id]

      const newBoard = { ...board }
      newBoard.columns.push(createdColumn)
      newBoard.columnOrderIds.push(createdColumn._id)
      setBoard(newBoard)
    }
  }

  const handleCreateCard = async (columnId: string, title: string) => {
    if (board) {
      const createdCard = await createCardAPI({ boardId: board._id, columnId, title })

      const newBoard = { ...board }
      const column = newBoard.columns.find(column => column._id === columnId)
      if (column) {
        if (column.cards.length === 1 && column.cards[0].FE_placeholder) {
          column.cards = []
          column.cardOrderIds = []
        }
        column.cards.push(createdCard)
        column.cardOrderIds.push(createdCard._id)
      }
      setBoard(newBoard)
    }
  }

  // Xử lý sau khi kéo thả column ở event DragEnd
  const handleMoveColums = (orderedColumns: ColumnType[]) => {
    if (board) {
      const orderedColumnsIds = orderedColumns.map(column => column._id)

      const newBoard = { ...board }
      newBoard.columns = orderedColumns
      newBoard.columnOrderIds = orderedColumnsIds
      setBoard(newBoard)

      // Update API
      updateBoardDetailsAPI(board._id, newBoard)
    }
  }

  // Xử lý sau khi kéo thả card trong cùng 1 column ở event DragEnd
  const handleMoveCardInTheSameColumn = (orderedCards: CardType[], orderedCardIds: string[], columnId: string) => {
    if (board) {
      const newBoard = { ...board }
      const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
      if (columnToUpdate) {
        columnToUpdate.cards = orderedCards
        columnToUpdate.cardOrderIds = orderedCardIds
        // Update board state
        setBoard(newBoard)
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

      const newBoard = { ...board }
      newBoard.columns = orderedColumns
      newBoard.columnOrderIds = orderedColumnsIds
      setBoard(newBoard)

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

  const handleDeleteColumn = (columnId: string) => {
    if (board) {
      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter(column => column._id !== columnId)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id => id !== columnId)
      setBoard(newBoard)
      deleteColumnAPI(columnId).then(res => toast.success(res?.deleteResult))
    }
  }

  useEffect(() => {
    const boardId = '67b3f30391d98682ed4db77f' // Temporarily hardcoded
    fetchBoardDetailsAPI(boardId)
      .then((boardData: BoardType) => {
        // Sắp xếp lại column theo columnOrderIds
        boardData.columns = mapOrder(boardData.columns, boardData.columnOrderIds, '_id')
        // Thêm card rỗng vào column nếu column không có card để có thể kéo thả card vào column
        boardData.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholcerCard(column)]
            column.cardOrderIds = [generatePlaceholcerCard(column)._id]
          } else {
            // Sắp xếp lại card theo cardOrderIds
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })
        setBoard(boardData)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {board && <BoardBar board={board} />}
      {board && (
        <BoardContent
          board={board}
          createColumn={handleCreateColumn}
          createCard={handleCreateCard}
          moveColums={handleMoveColums}
          moveCardInTheSameColumn={handleMoveCardInTheSameColumn}
          moveCardToDifferentColumn={handleMoveCardToDifferentColumn}
          deleteColumn={handleDeleteColumn}
        />
      )}
    </Container>
  )
}

export default Board
