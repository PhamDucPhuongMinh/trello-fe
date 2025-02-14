import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetailsAPI } from '~/apis'

const Board: React.FC = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67aeca85ecb3e1c0c80f0917a' // Temporarily hardcoded
    fetchBoardDetailsAPI(boardId)
      .then(data => {
        setBoard(data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {board && <BoardBar board={board} />}
      {board && <BoardContent board={board} />}
    </Container>
  )
}

export default Board
