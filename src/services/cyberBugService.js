import Axios from 'axios'
import { DOMAIN, TOKEN } from '../utils/constants/cyberBug'

export const cyberBugService = {
	signIn(data) {
		return Axios({
			url: `${DOMAIN}/users/signin`,
			method: 'POST',
			data,
		})
	},
	signUp(data) {
		return Axios({
			url: `${DOMAIN}/users/signup`,
			method: 'POST',
			data,
		})
	},
	deleteUser(userId) {
		return Axios({
			url: `${DOMAIN}/users/deleteUser?id=${userId}`,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	editUser(data) {
		return Axios({
			url: `${DOMAIN}/users/editUser`,
			method: 'PUT',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getAllProjectCategory() {
		return Axios({
			url: `${DOMAIN}/ProjectCategory`,
			method: 'GET',
		})
	},
	createProject(data) {
		return Axios({
			url: `${DOMAIN}/project/createProjectAuthorize`,
			method: 'POST',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getProject() {
		return Axios({
			url: `${DOMAIN}/project/getAllProject`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	editProject(data) {
		return Axios({
			url: `${DOMAIN}/project/updateProject?projectId=${data.id}`,
			method: 'PUT',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	deleteProject(data) {
		return Axios({
			url: `${DOMAIN}/project/deleteProject?projectId=${data.id}`,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getUser(data) {
		return Axios({
			url: `${DOMAIN}/users/getUser?keyword=${data}`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	assignUserProject(data) {
		return Axios({
			url: `${DOMAIN}/project/assignUserProject`,
			method: 'POST',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	deleteUserFromProject(data) {
		return Axios({
			url: `${DOMAIN}/project/removeUserFromProject`,
			method: 'POST',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getProjectDetail(projectId) {
		return Axios({
			url: `${DOMAIN}/project/getProjectDetail?id=${projectId}`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getTaskType() {
		return Axios({
			url: `${DOMAIN}/taskType/getAll`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getPriority() {
		return Axios({
			url: `${DOMAIN}/priority/getAll`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getStatus() {
		return Axios({
			url: `${DOMAIN}/status/getAll`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	createTask(data) {
		return Axios({
			url: `${DOMAIN}/project/createTask`,
			method: 'POST',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	getTaskById(taskId) {
		return Axios({
			url: `${DOMAIN}/project/getTaskDetail?taskId=${taskId}`,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	//! edit task
	updateStatus(data) {
		return Axios({
			url: `${DOMAIN}/project/updateStatus`,
			method: 'PUT',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	updateTask(data) {
		return Axios({
			url: `${DOMAIN}/project/updateTask`,
			method: 'POST',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	deleteTask(taskId) {
		return Axios({
			url: `${DOMAIN}/project/removeTask?taskId=${taskId}`,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	createComment(data) {
		return Axios({
			url: `${DOMAIN}/comment/insertComment`,
			method: 'POST',
			data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	deleteComment(id) {
		return Axios({
			url: `${DOMAIN}/comment/deleteComment?idComment=${id}`,
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
	editComment({ id, content }) {
		return Axios({
			url: `${DOMAIN}/Comment/updateComment?id=${id}&contentComment=${content}`,
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},
}
