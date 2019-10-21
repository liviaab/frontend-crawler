import React from 'react'
import style from './PartiesInvolved.module.scss'

const entity = (id, name, role) => (
  <div key={id} className={style.entity}>
    <p className={style.name}>{name}</p>
    <p className={style.role}>{role}</p>
  </div>
)

const PartiesInvolved = ({members}) => (
  <div className={style.partiesWrapper}>
    <p className={style.title}>Partes envolvidas</p>
    {members.map(m => entity(m.id, m.name, m.role))}
  </div>
)
export default PartiesInvolved
