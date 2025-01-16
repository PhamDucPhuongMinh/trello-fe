import React from 'react'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { CardType } from '~/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  card: CardType
}

const Card: React.FC<Props> = ({ card }) => {
  const isShowCardActions = () => !!card.memberIds.length || !!card.comments.length || !!card.attachments.length

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? '1px solid #1876d3' : '1px solid transparent'
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: card.FE_placeholder ? 'default' : 'pointer',
        overflow: 'unset',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        opacity: card.FE_placeholder ? '0 !important' : '1 !important' // Hide placeholder card
      }}
    >
      {card.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
      {isShowCardActions() && (
        <CardActions sx={{ padding: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<GroupIcon />}>
            {card.memberIds.length}
          </Button>
          <Button size="small" startIcon={<CommentIcon />}>
            {card.comments.length}
          </Button>
          <Button size="small" startIcon={<AttachmentIcon />}>
            {card.attachments.length}
          </Button>
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
