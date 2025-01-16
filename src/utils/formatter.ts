import { CardType, ColumnType } from '~/types'

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const generatePlaceholcerCard = (column: ColumnType): CardType => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    title: '',
    description: '',
    cover: '',
    memberIds: [],
    comments: [],
    attachments: [],
    FE_placeholder: true
  }
}
