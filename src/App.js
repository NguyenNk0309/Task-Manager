import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { LoginCyberBug, NotFound, SignUpCyberBug, CyberBug, ProjectDetail, UserManagement } from './pages'
import { LoginTemplate } from './templates'
import Loading from './components/Loading/Loading.jsx'
import { AnimatePresence } from 'framer-motion'
import CreateProject from './pages/CreateProject'
import { Notification, ProtectRoutes } from './components'
import ProjectManagement from './pages/ProjectManagement'
import Modal from './HOC/Modal'
import Modal2 from './HOC/Modal2'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function App() {
	const { isLoading } = useSelector((state) => state.loadingReducer)
	const { user } = useSelector((state) => state.loginReducer)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: 'SET_NAVIGATE', payload: navigate })
	}, [])

	return (
		<div className='App'>
			<div className='hidden md:block'>
				<AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
				<Modal />
				<Modal2 />
				<Notification />
				<Routes>
					<Route
						path='signIn'
						element={
							<LoginTemplate>
								<LoginCyberBug />
							</LoginTemplate>
						}
					/>
					<Route
						path='signUp'
						element={
							<LoginTemplate>
								<SignUpCyberBug />
							</LoginTemplate>
						}
					/>
					<Route path='*' element={<NotFound />} />
					<Route path='/' element={<Navigate to={`project/project-management`} />} />
					<Route element={<ProtectRoutes isSignIn={JSON.stringify(user) !== '{}'} />}>
						<Route path='project' element={<CyberBug />}>
							<Route path='project-detail/:projectId' element={<ProjectDetail />} />
							<Route path='create-project' element={<CreateProject />} />
							<Route path='project-management' element={<ProjectManagement />} />
							<Route path='user-management' element={<UserManagement />} />
							<Route path='*' element={<NotFound />} />
						</Route>
					</Route>
				</Routes>
			</div>
			<div className='z-[1000] flex items-center justify-center md:hidden w-screen h-screen bg-blue-500'>
				<h1 className='text-white text-4xl'>Resolution is not supported</h1>
			</div>
		</div>
	)
}

export default App
