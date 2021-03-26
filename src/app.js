import React from 'react'
import { render } from 'react-dom'
import Main from './views/Main'

const element = document.createElement('div')
const node = document.body.appendChild(element)
const root = () => render(<Main />, node)

export default root
