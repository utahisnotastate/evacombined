import React from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Card from '../../../Card/Card'
import CardHeader from '../../../Card/CardHeader'
import CardBody from '../../../Card/CardBody'
import styles from '../../chartsStyle'

const useStyles = makeStyles(styles)

export default function BarChart(props) {
	const classes = useStyles()
	return (
		<Card chart>
			<CardHeader color={props.chartbgcolor}>
				<ChartistGraph
					className="ct-chart-white-colors"
					data={props.chartdata}
					type="Bar"
					options={props.chartoptions}
					responsiveOptions={props.chartResponsiveOptions}
					listener={props.chartanimation}
				/>
			</CardHeader>
			<CardBody>
				<h4 className={classes.cardTitle}>{props.headlinetext}</h4>
				<p className={classes.cardCategory}>{props.subtext}</p>
			</CardBody>
		</Card>
	)
}
