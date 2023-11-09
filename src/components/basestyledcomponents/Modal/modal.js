import React from 'react'
// material-ui components
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Close from '@material-ui/icons/Close'
import Button from '../Button'
import styles from './modalStyle'
const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />
})

export default function Modal(props) {
	const [modal, setModal] = React.useState(false)
	const classes = useStyles()
	return (
		<div>
			<Button color="primary" onClick={() => setModal(true)}>
				{props.buttontext}
			</Button>
			<Dialog
				classes={{
					root: classes.center,
					paper: classes.modal,
				}}
				open={modal}
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
					<h4 className={classes.modalTitle}>{props.modaltitle}</h4>
				</DialogTitle>
				<DialogContent
					id="modal-slide-description"
					className={classes.modalBody}>
					<Typography>Check In Form</Typography>
				</DialogContent>
			</Dialog>
		</div>
	)
}

/*

 */
