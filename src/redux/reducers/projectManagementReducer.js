import { GET_PROJECT, SEARCH_PROJECT } from '../constants/cyberBugConst'
import { USER_INFO } from '../../utils/constants/cyberBug'

const initialState = {
	projects: [],
	projectSearch: [],
}

export default function ProjectManagementReducer(state = initialState, { type, payload }) {
	const newState = JSON.parse(JSON.stringify(state))
	switch (type) {
		case GET_PROJECT: {
			const myId = JSON.parse(localStorage.getItem(USER_INFO)).id
			const myProject = payload.filter(
				(project) => project.creator.id === myId || project.members.find((member) => member.userId === myId)
			)
			newState.projects = myProject
			return newState
		}
		case SEARCH_PROJECT: {
			newState.projectSearch = payload
			return newState
		}
		default:
			return state
	}
}
