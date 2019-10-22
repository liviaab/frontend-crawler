import React from 'react'
import style from './LawsuitDetails.module.scss'

const dict = {
  area: "Área",
  judge: "Juíz",
  process_class: "Classe",
  subject: "Assunto",
  value: "Valor da ação",
}


const buildDetails = ({ process }) => {
  const entries = Object.entries(process)

  if(entries.length !== 0) {
    return entries
            .filter(([key]) => dict.hasOwnProperty(key))
            .map(([key, value]) => <p key={key}>{dict[key]}  &bull;  {value}</p>)
  }
}

const LawsuitDetails = (process) => (
  <div className={style.detailsWrapper}>
    <p className={style.title}>Detalhes do processo</p>
    {buildDetails(process)}
  </div>
)

export default LawsuitDetails
