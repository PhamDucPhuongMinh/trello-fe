import React, { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import ListColumns from './ListColumns/ListColumns'
import { BoardType, CardType, ColumnType } from '~/types'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  DragOverEvent,
  closestCorners,
  Active,
  Over,
  CollisionDetection,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/customDndKitSensor'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholcerCard } from '~/utils/formatter'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

type Props = {
  board: BoardType
  createColumn: (_title: string) => Promise<void>
  createCard: (_columnId: string, _title: string) => Promise<void>
  deleteColumn: (_columnId: string) => void
  moveColums: (_orderedColumns: ColumnType[]) => void
  moveCardInTheSameColumn: (_orderedCards: CardType[], _orderedCardIds: string[], _columnId: string) => void
  moveCardToDifferentColumn: (
    _prevColumnId: string,
    _nextColumnId: string,
    _cardId: string,
    _orderedColumns: ColumnType[]
  ) => void
}

const BoardContent: React.FC<Props> = ({
  board,
  createColumn,
  createCard,
  deleteColumn,
  moveColums,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn
}) => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } }) // Mouse di chuyên 10px mới bắt đầu drag
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } }) // Touch di chuyên 10px mới bắt đầu drag
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])
  const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null) // Id của item đang được drag
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null) // Loại của item đang được drag (column hoặc card)
  const [activeDragItemData, setActiveDragItemData] = useState<ColumnType | CardType | null>(null) // Dữ liệu của item đang được drag
  const [oldColumnOfDraggingCard, setOldColumnOfDraggingCard] = useState<ColumnType | null>(null) // Column cũ của card đang kéo

  // Điểm va chạm cuối cùng (xử lý thuật toán va chạm)
  const lastOverId = useRef<string | null>(null)

  const findColumnByCardId = (cardId: string) => {
    return orderedColumns.find(column => column.cards.map(card => card._id).includes(cardId))
  }

  const handleMoveCardBetweenDifferentColumns = (
    active: Active,
    over: Over,
    overColumn: ColumnType,
    activeColumn: ColumnType,
    eventTrigger: 'dragover' | 'dragend'
  ) => {
    setOrderedColumns(prevState => {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // Over card là card có vị trí mà dragging card sẽ được thả vào
      const { id: overCardId } = over

      // Tìm vị trí (index) của over card trong column đích (nơi card sẽ được thả vào)
      const overCardIndex = overColumn.cards.findIndex(card => card._id === overCardId)

      const isBellowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBellowOverItem ? 1 : 0

      const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1

      const nextColumns = cloneDeep(prevState)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        // Xoá card ở column active (được xem là column cũ của card đang kéo)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Cập nhật lại cardOrderIds của column active (column cũ của card đang kéo)
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        // Thêm placeholder card vào column nếu column đó rỗng để tránh lỗi khi kéo thả card vào column rỗng - Dữ liệu chỉ giả ở phía Client
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholcerCard(nextActiveColumn)]
        }
      }
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo đã có trong column đích chưa, nếu có thì xoá nó đi
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Thêm card vào column đích (nơi card sẽ được thả vào) theo vị trí Index mới
        const rebuildActiveDraggingCardData = { ...(activeDraggingCardData as CardType), columnId: overColumn._id }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuildActiveDraggingCardData)
        // Xoá placeholder card nếu có
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_placeholder)
        // Cập nhật lại cardOrderIds của column đích (nơi card sẽ được thả vào)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      if (eventTrigger === 'dragend' && oldColumnOfDraggingCard && nextOverColumn) {
        moveCardToDifferentColumn(
          oldColumnOfDraggingCard._id.toString(),
          nextOverColumn._id.toString(),
          activeDraggingCardId.toString(),
          nextColumns
        )
      }

      return nextColumns
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    if (active) {
      setActiveDragItemId(active.id.toString())
      setActiveDragItemType(active.data.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
      setActiveDragItemData(active.data.current as ColumnType | CardType)
    }

    if (active.data.current?.columnId) {
      setOldColumnOfDraggingCard(findColumnByCardId(active.id.toString()) || null)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Không xử lý nếu item đang kéo thả là COLUMN
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Xử lý khi item đang kéo thả là CARD
    const { active, over } = event
    if (!active || !over || active.id === over.id) return // Không có đối tượng kéo thả hoặc không có đối tượng đích đến hoặc 2 đối tượng giống nhau
    // Dragging card là card đang kéo thả
    const { id: activeDraggingCardId } = active
    const { id: overCardId } = over // Over card là card có vị trí mà dragging card sẽ được thả vào

    // Tìm column chứa dragging card và over card
    const activeColumn = findColumnByCardId(activeDraggingCardId.toString())
    const overColumn = findColumnByCardId(overCardId.toString())

    if (!activeColumn || !overColumn) return

    // Chỉ xử lý khi kéo thả CARD từ COLUMN này sang COLUMN khác
    // Đây là xử lý trong lúc kéo, còn kéo xong thì nó ở hàm handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      handleMoveCardBetweenDifferentColumns(active, over, overColumn, activeColumn, 'dragover')
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    // Không có đối tượng kéo thả hoặc không có đối tượng đích đến hoặc 2 đối tượng giống nhau
    if (!active || !over) return

    // Item đang kéo thả là CARD
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId } = active
      const { id: overCardId } = over // Over card là card có vị trí mà dragging card sẽ được thả vào

      // Tìm column chứa dragging card và over card
      const activeColumn = findColumnByCardId(activeDraggingCardId.toString())
      const overColumn = findColumnByCardId(overCardId.toString())

      if (!activeColumn || !overColumn || !oldColumnOfDraggingCard) return

      // Khi kéo thả card sang column khác
      if (oldColumnOfDraggingCard._id !== overColumn._id) {
        handleMoveCardBetweenDifferentColumns(active, over, overColumn, activeColumn, 'dragend')
      }
      // Khi kéo thả card trong cùng 1 column
      else {
        const oldCardIndex = oldColumnOfDraggingCard.cards.findIndex(column => column._id === activeDragItemId)
        const newCardIndex = overColumn.cards.findIndex(column => column._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnOfDraggingCard.cards, oldCardIndex, newCardIndex)
        const dndOrderdCardIds = dndOrderedCards.map(card => card._id)

        setOrderedColumns(prevState => {
          const nextColumns = cloneDeep(prevState)

          // Tìm column đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderdCardIds
          }

          return nextColumns
        })

        moveCardInTheSameColumn(dndOrderedCards, dndOrderdCardIds, oldColumnOfDraggingCard._id)
      }
    }
    // Item đang kéo thả là COLUMN
    else {
      // Đối tượng kéo thả và đối tượng đích đến không giống nhau
      if (active && over && active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // Update state
        setOrderedColumns(dndOrderedColumns)
        // Update API
        moveColums(dndOrderedColumns)
      }
      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
      setOldColumnOfDraggingCard(null)
    }
  }

  // Animation khi thả item
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy = useCallback<CollisionDetection>(
    args => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections.length) return [] // Kéo thả card lên trền cùng màn hình (ra ngoài khu vực kéo thả)
      // Thuật toán phát hiện va chạm sẽ trả về mảng các va chạm
      // const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args) // Thay thế bằng code dòng if (!pointerIntersections.length) return
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find(column => column._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              container =>
                overId &&
                container.id !== overId.toString() &&
                checkColumn.cardOrderIds.includes(container.id.toString())
            )
          })[0]?.id
        }

        lastOverId.current = overId?.toString()
        return [{ id: overId }]
      }

      // Nếu overId không tồn tại thì trả về mảng rỗng
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  useEffect(() => {
    // Đã được sắp xếp theo ColumnOrderedIds ở Board component (_id.tsx)
    setOrderedColumns(board.columns)
  }, [board])

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      // collisionDetection={closestCorners} // Thuật toán phát hiện va chạm (nếu không có thì card có ảnh cover sẽ không thể kéo thả đc)
      collisionDetection={collisionDetectionStrategy} // Nếu chỉ dùng closestCorners thì card bị flickering khi kéo ở giữa 2 cột => tự custom lại thuật toán phát hiện va chạm
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          backgroundColor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createColumn={createColumn}
          createCard={createCard}
          deleteColumn={deleteColumn}
        />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemId || !activeDragItemType) && null}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData as ColumnType} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData as CardType} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
