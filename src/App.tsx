import React from 'react'
import Board from './pages/Boards/_id'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { UserType } from './types'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/currentUser/currentUserSlice'

const ProtectedRoute = ({ user }: { user: UserType | null }) => {
  if (!user) return <Navigate to="/login" replace />
  else return <Outlet />
}

const App: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards/67b3f30391d98682ed4db77f" replace={true} />} />
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path="/boards/:boardId" element={<Board />} />
      </Route>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
