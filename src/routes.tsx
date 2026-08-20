import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Login, LogoutPage, ErrorPage } from './pages';
import { useAuth } from "./auth"

const AppRoutes = () => {
	const { isAuthenticated } = useAuth()

	return (
		<Routes>
			<Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
			{/* LOGIN PAGES */}
			<Route path="/login" element={<Login pageForm="login" />} />
			<Route path="/forgot-password" element={<Login pageForm="forgot-password" />} />
			<Route path="/register" element={<Login pageForm="create-account" />} />
			<Route path="/logout" element={<LogoutPage />} />
			{/*  */}
			<Route path="/dashboard" element={<Dashboard />} />
			{/* ERROR PAGES */}
			<Route path="/bad-request" element={isAuthenticated ? <ErrorPage statusCode={400} /> : <Navigate to="/login" replace />} />
			<Route path="/not-found" element={isAuthenticated ? <ErrorPage statusCode={404} /> : <Navigate to="/login" replace />} />
			<Route path="/unauthorized" element={isAuthenticated ? <ErrorPage statusCode={401} /> : <Navigate to="/login" replace />} />
			<Route path="/forbidden" element={isAuthenticated ? <ErrorPage statusCode={403} /> : <Navigate to="/login" replace />} />
			<Route path="*" element={isAuthenticated ? <ErrorPage statusCode={404} /> : <Navigate to="/login" replace />} />
			
			
		</Routes>
	)
}

export default AppRoutes
