import React, {Fragment} from 'react'
import { Table } from 'evergreen-ui'
import PropTypes from 'prop-types'
import style from './ListOfChanges.module.scss'

const buildBody = (changes) => {
  if(changes === []) {
    return <Fragment />
  }

  return (
    <Table.Body>
      {changes.map(change => (
            <Table.Row key={change.id} height="auto" paddingY={12} className={style.change}>
              <Table.TextCell isNumber >{change.date}</Table.TextCell>
              <Table.TextCell className={style.description}>{change.description}</Table.TextCell>
            </Table.Row>)
        )
      }
    </Table.Body>
  )
}

const buildHeader = () => (
  <Table.Head>
    <Table.TextHeaderCell>
      Movimentações
    </Table.TextHeaderCell>
  </Table.Head>
)

const buildTable = (changes) => {
  return(
    <Table className={style.changesTable}>
      {buildHeader()}
      {buildBody(changes)}
    </Table>
  )
}

const ListOfChanges = ({ changes }) => buildTable(changes)

ListOfChanges.propTypes = {
  changes: PropTypes.array.isRequired
}


export default ListOfChanges
