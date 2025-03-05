import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

const AccountVerification: React.FC = () => {
  const [verified, setVerified] = useState(false)
  const [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
      setVerified(true)
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  if (!verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
