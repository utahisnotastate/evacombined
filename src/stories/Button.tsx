// create a button component
import React from 'react'
import './Button.css'

export interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 *
	 */
	primary?: boolean
	/**
	 * What background color to use
	 *
	 */
	backgroundColor?: string
	/**
	 *
	 */
	size?: 'small' | 'medium' | 'large'
}
