import React from 'react'
import Card from './Card/Card'
import Box from '@mui/material/Box'
import { CardType } from '~/types'

type Props = {
  cards: CardType[]
}

const ListCards: React.FC<Props> = ({ cards }) => {
  return (
    <Box
      sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: theme =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeightHeader} - ${
            theme.trello.columnHeightFooter
          })`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}
    >
      {cards.map(card => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  )
}

export default ListCards
