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
type Props = {
  hiddenMedia?: boolean
}

const Card: React.FC<Props> = ({ hiddenMedia }) => {
  if (hiddenMedia) {
    return (
      <MuiCard sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Lizard</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{ cursor: 'pointer', overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ padding: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          20
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
