import React from 'react'
import PropTypes from 'prop-types'
import defaultStyle from './Title.module.scss'

const Title = ({ title, subtitle, customStyle }) => {
	const style = customStyle ? customStyle : defaultStyle

	return (
		<div className={style.wrapper} >
			<span className={style.title}>{title}</span>
			<span className={style.subtitle}>{subtitle}</span>
		</div>
	)
}

Title.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	style: PropTypes.shape({
		wrapper: PropTypes.string,
		title: PropTypes.string,
		subtitle: PropTypes.string
	})
}

Title.deafultProps = {
	subtitle: '',
	style: null
}

export default Title
