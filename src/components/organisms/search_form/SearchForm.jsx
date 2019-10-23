import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Combobox, TextInput, Button, toaster } from 'evergreen-ui'
import style from './SearchForm.module.scss'
import { courtsService, processesService } from '../../../services'

const unformattedErrorMessage = 'Para realizar a pesquisa, preencha o(s) campo(s): {}.'

class SearchForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			courts: [],
			courtName: {
				valid: false,
				value: ''
			},
			processNumber: {
				valid: false,
				value: ''
			}
		}
	}

	async componentDidMount() {
		try {
			const response = await courtsService().get()
			const courts = response.data.map(item => ({'id': item.id, 'label': item.initials}))
			this.setState({ courts })
		} catch (error) {
			toaster.danger('Algo de errado aconteceu durante a busca de tribunais.', 500)
		}
	}

	canDoSearch = () => {
		const { courtName, processNumber } = this.state
		return courtName.valid && processNumber.valid
	}

	errorMessageFields = () => {
		const { courtName, processNumber } = this.state
		let fields

		if(!courtName.valid && !processNumber.valid) {
			fields = 'Tribunal e Número do Processo'
		} else if(!courtName.valid) {
			fields = 'Tribunal'
		} else {
			fields = 'Número do Processo'
		}

		return fields
	}

	showValidationMessage = () => {
		const fields = this.errorMessageFields()
		const errorMessage = unformattedErrorMessage.replace('{}', fields)

		toaster.warning(errorMessage, 400)
	}

	handleButton = async (event) => {
		const { processNumber, courtName } = this.state
		let response = undefined

		if(!this.canDoSearch()) {
			this.showValidationMessage()
			return
		}

		try {
			response = await processesService().get(processNumber.value)
			response = {
				...response.data,
				court_name: courtName.value
			}
			toaster.success('Processo encontrado!', 500)
		} catch (error) {
			if (error.response.status === 404) {
				toaster.danger('Processo não encontrado', 500)
			} else {
				toaster.danger(
					'Algo de errado aconteceu durante a busca e não foi possível recuperar o processo.'
				, 500)
			}
		} finally {
			this.props.onSearchResult(response)
		}
	}

	updateField = (field, value) =>	{
		value = value.trim()
		const valid = value !== ''

		this.setState({ [field]: { value, valid }})
	}

	handleComboboxChange = event => this.updateField('courtName', event.label)

	handleInputChange = event => this.updateField('processNumber', event.target.value)

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
					onChange={this.handleComboboxChange}
				/>
				<TextInput
					id='input-process-number'
					name='input-process-number'
					placeholder='Número do processo'
					className={style.processField}
					height={40}
					onChange={this.handleInputChange}
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
	onSearchResult: PropTypes.func.isRequired
}

export default SearchForm
