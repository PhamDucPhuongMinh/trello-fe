import React from 'react'
import Board from './pages/Boards/_id'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards/67b3f30391d98682ed4db77f" replace={true} />} />
      <Route path="/boards/:boardId" element={<Board />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
