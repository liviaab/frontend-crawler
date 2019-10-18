import React from 'react'
import Title from '../../molecules'
import SearchForm from '../../organisms'
import style from './Search.module.scss'

const Search = () => (
	<div className={style.searchPage}>
		<div className={style.header}>
		<Title
			title='Busca'
			subtitle='Selecione um Tribunal para listar os processos ou buscar pelo número unificado'
		/>
	  <SearchForm />

	  </div>
	</div>

)

export default Search


