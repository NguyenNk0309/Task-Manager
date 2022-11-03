import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import loginReducer from './reducers/loginReducer'
import loadingReducer from './reducers/loadingReducer'
import projectCategoryReducer from './reducers/projectCategoryReducer'
import modalReducer from './reducers/modalReducer'
import createMiddlewareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga'
import ProjectManagementReducer from './reducers/projectManagementReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import projectDetailReducer from './reducers/projectDetailReducer'
import taskType_Priority_StatusReducer from './reducers/taskType_Priority_StatusReducer'
import taskReducer from './reducers/taskReducer'
import modal2Reducer from './reducers/modal2Reducer'
import navigateReducer from './reducers/navigateReducer'

const middlewareSaga = createMiddlewareSaga()

const rootReducer = combineReducers({
	modalReducer,
	modal2Reducer,
	loginReducer,
	loadingReducer,
	projectCategoryReducer,
	ProjectManagementReducer,
	notificationReducer,
	userReducer,
	projectDetailReducer,
	taskType_Priority_StatusReducer,
	taskReducer,
	navigateReducer,
})

const store = createStore(rootReducer, applyMiddleware(middlewareSaga))

middlewareSaga.run(rootSaga)

export default store
