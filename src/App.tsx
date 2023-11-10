import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import theme from './styles/theme'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from 'react-modal-hook'
import Eva from './components/Eva/eva'
//import Home from './components/Home/home'
import store from '../src/store/store'
import './App.css'

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<ModalProvider>
						<Eva />
					</ModalProvider>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	)
}

export default App
