import { TextField } from '@mui/material'

interface InputProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean
	/**
	 *
	 */
	autoComplete?: string
	autoFocus?: boolean
	color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
	defaultValue: any
	disabled?: boolean
	fullWidth: true
	helperText: string
	label: string
	multiline: boolean
	maxRows: number
	minRows: number
	select: boolean
	variant: 'standard' | 'outlined' | 'filled'
}
