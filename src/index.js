import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.min.css'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/configStore'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
