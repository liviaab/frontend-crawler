import React, { Component } from 'react'
import { LawsuitDetails, PartiesInvolved, Title } from '../../molecules'
import { SearchForm, ListOfChanges } from '../../organisms'
import style from './Search.module.scss'


class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showResults: false,
			process: {
				process_number: '',
				court_name: '',
				distribution_date: '',
				parties_involved: [],
				movimentations: []
			}
		}
	}

	updateProcess = (data) => {
		this.setState({
			process: {
				...this.state.process,
				...data
			},
			showResults: true
		})
	}

	getResultsStyle = () => (this.state.showResults ? style.resultsWrapper : style.hideResults)

	render() {
		const {
			process_number,
			court_name,
			movimentations,
			parties_involved,
			distribution_date
		} = this.state.process

		const resultsStyle = this.getResultsStyle()

		return (
			<div className={style.searchPage}>
				<div className={style.header}>
					<div className={style.content}>
					<Title
						title='Busca'
						subtitle='Selecione um Tribunal para listar os processos\
											ou buscar pelo número unificado'
					/>
					<SearchForm updateParent={this.updateProcess} />
					</div>
				</div>

				<div className={resultsStyle} id="search-results">
					<Title
						title={`Processo n. ${process_number} do ${court_name}`}
						subtitle={`Distribuido em ${distribution_date}`}
					/>
					<div className={style.results}>
						<div className={style.changes}>
							<ListOfChanges changes={movimentations}/>
						</div>
						<div className={style.infos}>
							<LawsuitDetails process={this.state.process}/>
							<br/>
							<PartiesInvolved members={parties_involved}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Search
