import { combineReducers, configureStore } from '@reduxjs/toolkit'
import activeBoardReducer from './activeBoard/activeBoardSlice'
import currentUserReducer from './currentUser/currentUserSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'

// Cấu hình redux-persist
const persistConfig = {
  key: 'root',
  storage: storage,
  whiteList: ['user'] // định ngh nghĩa các reducer cần lưu trữ sau khi refresh
}

// Combine reducers
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: currentUserReducer
})

// Thực hiện persist reducer
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // Fix warning khi implement redux-persist
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
