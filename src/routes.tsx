import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Login, NotFound } from './pages';
import { useAuth } from "./auth"

const AppRoutes = () => {
	const { isAuthenticated } = useAuth()

	return (
		<Routes>
			<Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
			<Route path="/login" element={<Login pageForm="login" />} />
			<Route path="/forgot-password" element={<Login pageForm="forgot-password" />} />
			<Route path="/register" element={<Login pageForm="create-account" />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="*" element={isAuthenticated ? <NotFound statusCode={404} /> : <Navigate to="/login" replace />} />
		</Routes>
	)
}

export default AppRoutes
