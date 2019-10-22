import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Combobox, TextInput, Button, toaster} from 'evergreen-ui'
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

	componentDidMount() {
		courtsService().get().then(response => {
			const courts = response.data.map(item => ({'id': item.id, 'label': item.initials}))
			this.setState({ courts })
		}).catch(error => toaster.danger('Algo de errado aconteceu durante' +
																			'a busca de tribunais.', 500))
	}

	updateField = (field, value) =>	{
		value = value.trim()
		const valid = value !== ''

		this.setState({ [field]: { value, valid }})
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

	handleButton = (event) => {
		const { processNumber, courtName } = this.state

		if(this.canDoSearch()) {
			processesService().get(processNumber.value).then(response => {
				let showResults = true

				if (response.status === 404) {
					toaster.info('Processo não encontrado', 500)
					showResults = false
				}

				this.props.updateParent({
					process: { ...response.data, court_name: courtName.value },
					showResults: showResults
				})
			}).catch(error => {
				toaster.danger('Algo de errado aconteceu durante a busca \
												e não foi possível recuperar o processo.', 500)
			})
		}
		else {
			const fields = this.errorMessageFields()
			const errorMessage = unformattedErrorMessage.replace('{}', fields)

 			toaster.warning(errorMessage, 400)
		}
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
					onChange={e => this.updateField('courtName', e.label)}
				/>
				<TextInput
					id='input-process-number'
					name='input-process-number'
					placeholder='Número do processo'
					className={style.processField}
					height={40}
					onChange={e => this.updateField('processNumber', e.target.value)}
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
