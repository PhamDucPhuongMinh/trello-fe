import { configureStore } from '@reduxjs/toolkit'
import activeBoardReducer from './activeBoard/activeBoardSlice'
import currentUserReducer from './currentUser/currentUserSlice'

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    user: currentUserReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
