import React from 'react'
import style from './LawsuitDetails.module.scss'

const LawsuitDetails = () => (
  <div className={style.detailsWrapper}>
    <p className={style.title}>Detalhes do processo</p>

    <p> Cumprimento de sentença - Honorários Advocatícios </p>
    <p> TJSP - Forum Joao Menezes Junior - Balneário Camboriú - 4a Vara Cível</p>
    <p> Processo Judicial - Rito ordinário </p>
    <p> Processo julgado - 1a instância - Valor da causa: R$  1.378,90 </p>
  </div>
)

export default LawsuitDetails
