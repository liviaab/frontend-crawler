import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Combobox, TextInput, Button, toaster} from 'evergreen-ui'
import style from './SearchForm.module.scss'
import { courtsService, processesService } from '../../../services'

class SearchForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			courts: [],
			court_name: '',
			process_number: '',
		}
	}

	componentDidMount() {
		courtsService().get().then(response => {
			const courts = response.data.map(item => ({'id': item.id, 'label': item.initials}))
			this.setState({ courts })
		}).catch(error => toaster.danger('Algo de errado aconteceu durante' +
																			'a busca de tribunais.', 500))
	}

	updateField = (field, value) =>	this.setState({ [field]: value })

	handleButton = (event) => {
		const { process_number, court_name } = this.state

		processesService().get(process_number).then(response => {
			this.props.updateParent({ ...response.data, court_name })
		}).catch(error => toaster.danger('Algo de errado aconteceu durante' +
																			'a busca do processo.', 500))
	}

	render(){
		const { courts, process_number } = this.state

		return(
			<div className={style.searchForm}>
				<Combobox
					items={courts}
					itemToString={item => item ? item.label : ''}
					placeholder='Tribunal'
					className={style.courtField}
					width="100%"
					height={40}
					onChange={e => this.updateField('court_name', e.label)}
				/>
				<TextInput
					id='input-process-number'
					name='input-process-number'
					placeholder='Número do processo'
					className={style.processField}
					height={40}
					onChange={e => this.updateField('process_number', e.target.value)}
					value={process_number}
				/>
				<Button
					id="submit"
					iconBefore="search"
					className={style.submit}
					background-color="#9a9a9a"
					marginLeft={20}
					height={40}
					onClick={this.handleButton}
				>
					Buscar
				</Button>
			</div>
		)
	}
}

SearchForm.propTypes = {
	updateParent: PropTypes.func.isRequired
}

export default SearchForm
