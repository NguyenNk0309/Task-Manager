import React from 'react'
import { Popconfirm } from 'antd'

const PopUpConfirm = ({ text, children, onConfirm }) => {
	return (
		<Popconfirm
			okButtonProps={{
				className: 'text-blue-500 hover:bg-blue-500 hover:text-white',
			}}
			cancelButtonProps={{
				className: 'text-red-500 hover:bg-red-500 hover:text-white',
			}}
			okType='default'
			onConfirm={onConfirm}
			title={text}
			okText='Yes'
			cancelText='No'>
			{children}
		</Popconfirm>
	)
}

export default PopUpConfirm
