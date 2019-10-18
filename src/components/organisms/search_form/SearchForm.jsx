import React from 'react'
import { Combobox, TextInput, Button } from 'evergreen-ui'
import style from './SearchForm.module.scss'

const SearchForm = () => (
	<div className={style.searchForm}>
		<Combobox 
			placeholder='Tribunal'
			className={style.courtField}
			width="100%"
			height={40}
		/>
		<TextInput
			name='input-process-number'
			placeholder='Número do processo'
			className={style.processField}
			height={40}
		/>
		<Button 
			iconBefore="search" 
			className={style.submit}
			background-color="#9a9a9a"	
			marginLeft={20}
			height={40}
		>
			Buscar
		</Button>
	</div>
)

export default SearchForm