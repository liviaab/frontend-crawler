import React from 'react'
import { LawsuitDetails, PartiesInvolved, Title } from '../../molecules'
import { SearchForm, ListOfChanges } from '../../organisms'
import style from './Search.module.scss'

const Search = () => (
	<div className={style.searchPage}>
		<div className={style.header}>
			<div className={style.content}>
			<Title
				title='Busca'
				subtitle='Selecione um Tribunal para listar os processos ou buscar pelo número unificado'
			/>
		  <SearchForm />
			</div>
	  </div>

		<div className={style.resultsWrapper}>
			<Title
				title='Processo n. 1234.567.89 do TJSP'
				subtitle='Distribuido em 09/11/2019'
			/>
			<div className={style.results}>
				<div className={style.changes}>
					<ListOfChanges />
				</div>
				<div className={style.infos}>
				  <LawsuitDetails />
					<br/>
				  <PartiesInvolved />
				</div>
			</div>
		</div>
	</div>
)

export default Search
