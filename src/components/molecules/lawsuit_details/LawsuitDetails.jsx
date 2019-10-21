import React from 'react'
import style from './LawsuitDetails.module.scss'

const DATA_INDEX = 0
const VALUE_INDEX = 1

const dict = {
  area: "Área",
  judge: "Juíz",
  process_class: "Classe",
  subject: "Assunto",
  value: "Valor da ação",
}


const htmlDetail = (key, value) =>  (
    <p key={key}>{dict[key]}  &bull;  {value}</p>
)

const buildDetails = ({ process }) => {
  const entries = Object.entries(process)

  if(entries != []) {
    return entries
            .filter(item => dict.hasOwnProperty(item[DATA_INDEX]))
            .map(item => htmlDetail(item[DATA_INDEX], item[VALUE_INDEX]))
  }
}

const LawsuitDetails = (process) => (
  <div className={style.detailsWrapper}>
    <p className={style.title}>Detalhes do processo</p>
    {buildDetails(process)}
  </div>
)

export default LawsuitDetails
