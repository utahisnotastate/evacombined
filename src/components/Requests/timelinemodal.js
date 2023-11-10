import * as React from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TimeLine from './timeline'
import UpdateRequestForm from './updaterequestform'

export default function TimeLineModal({
	buttontext,
	color,
	updates,
	title,
	request_description,
	actiontext,
	variant,
}) {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button color={color} onClick={handleClickOpen} variant={variant}>
				{buttontext}
			</Button>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{request_description}
					</DialogContentText>
				</DialogContent>
				<DialogContent style={{ backgroundColor: 'lightgray' }}>
					<TimeLine updates={updates} />
				</DialogContent>
				<DialogContent>
					<Divider />
					<Typography variant="h6">Update Request</Typography>
				</DialogContent>
				<DialogContent>
					<UpdateRequestForm />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{actiontext.disagree}</Button>
					<Button autoFocus onClick={handleClose}>
						{actiontext.agree}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
