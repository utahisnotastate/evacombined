import React from 'react'
// material-ui components
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '../Button'
import Close from '@material-ui/core/SvgIcon/SvgIcon'
import DialogContent from '@material-ui/core/DialogContent'
import styles from './modalStyle'
import CheckInForm from '../../old/Forms/Administrative/Scheduling/CheckIn/checkin'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />
})
export default function SlotDialog(props) {
	const classes = useStyles()
	return (
		<Dialog
			classes={{
				root: classes.center,
				paper: classes.modal,
			}}
			open={true}
			disableBackdropClick
			keepMounted
			fullScreen={true}
			fullWidth={true}
			transition={Transition}
			onClose={() => setModal(false)}
			aria-labelledby="modal-slide-title"
			aria-describedby="modal-slide-description">
			<DialogTitle
				id="classic-modal-slide-title"
				disableTypography
				className={classes.modalHeader}>
				<Button
					justIcon
					className={classes.modalCloseButton}
					key="close"
					aria-label="Close"
					color="transparent"
					onClick={() => setModal(false)}>
					<Close className={classes.modalClose} />
				</Button>
				<h4 className={classes.modalTitle}>Patient Check In</h4>
			</DialogTitle>
			<DialogContent
				id="modal-slide-description"
				className={classes.modalBody}>
				<CheckInForm />
			</DialogContent>
		</Dialog>
	)
}
