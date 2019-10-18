import React from 'react'
import style from './PartiesInvolved.module.scss'

const PartiesInvolved = () => (
  <div className={style.partiesWrapper}>
    <p className={style.title}>Partes envolvidas</p>

    <div className={style.entity}>
      <p className={style.name}>Lívia Almeida Barbosa</p>
      <p className={style.role}>Advogada envolvida</p>
    </div>

    <div className={style.entity}>
      <p className={style.name}>Joana Lima</p>
      <p className={style.role}>Advogada envolvida</p>
    </div>
  </div>
)

export default PartiesInvolved
