import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoutes = ({ isSignIn }) => {
	return isSignIn ? <Outlet /> : <Navigate to='signIn' />
}

export default ProtectRoutes
