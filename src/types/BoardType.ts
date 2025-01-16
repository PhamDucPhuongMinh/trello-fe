type BoardType = {
  _id: string
  title: string
  description: string
  type: 'public' | 'private'
  ownerIds: string[] // Những users là Admin của board
  memberIds: string[] // Những users là member bình thường của board
  columnOrderIds: string[] // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
  columns: ColumnType[]
}

type ColumnType = {
  _id: string
  boardId: string
  title: string
  cardOrderIds: string[]
  cards: CardType[]
}

type CardType = {
  _id: string
  boardId: string
  columnId: string
  title: string
  description: string | null
  cover: string | null
  memberIds: string[]
  comments: string[]
  attachments: string[]
  FE_placeholder?: boolean
}

export type { BoardType, ColumnType, CardType }
