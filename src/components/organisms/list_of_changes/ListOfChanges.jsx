import React, {Fragment} from 'react'
import { Table } from 'evergreen-ui'
import PropTypes from 'prop-types'
import style from './ListOfChanges.module.scss'

const Header = () => (
  <Table.Head>
    <Table.TextHeaderCell>
      Movimentações
    </Table.TextHeaderCell>
  </Table.Head>
)

const Body = ({ changes }) => {
  if(changes.length === 0) {
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

const ListOfChanges = ({ changes }) => (
  <Table className={style.changesTable}>
    <Header />
    <Body changes={changes} />
  </Table>
)

ListOfChanges.propTypes = {
  changes: PropTypes.array.isRequired
}

export default ListOfChanges
