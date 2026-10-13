import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Login, LogoutPage, ErrorPage, About, Analytics, Contact, Reports, Settings } from './pages';
import { Editor, VideoProduction, MediaManager } from './applications';

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

			{/* STATIC PAGES */}
			<Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/logout" element={<LogoutPage />} />
			{/*  */}
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/dashboard/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/dashboard/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/dashboard/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/unauthorized" replace />} />
			{/* APPLICATIONS */}
			<Route path="/media-manager" element={isAuthenticated ? <MediaManager /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/lesson-editor" element={isAuthenticated ? <Editor /> : <Navigate to="/unauthorized" replace />} />
			{/* AI ASSET GENERATION */}
			<Route path="/assets" element={isAuthenticated ? <VideoProduction tab="characters" /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/assets/characters" element={isAuthenticated ? <VideoProduction tab="characters" /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/assets/locations" element={isAuthenticated ? <VideoProduction tab="locations" /> : <Navigate to="/unauthorized" replace />} />
			<Route path="/assets/equipment" element={isAuthenticated ? <VideoProduction tab="equipment" /> : <Navigate to="/unauthorized" replace />} />
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
