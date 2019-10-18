import React from 'react'
import { Table } from 'evergreen-ui'
import style from './ListOfChanges.module.scss'

const buildBody = () => (
  <Table.Body height={240}>
      <Table.Row key="1" height="auto" paddingY={12} className={style.change}>
        <Table.TextCell>21/09/2019</Table.TextCell>
        <Table.TextCell>Lorem ipsum dolor sit amet</Table.TextCell>
      </Table.Row>
      <Table.Row key="2" height="auto" paddingY={12} className={style.change}>
        <Table.TextCell>21/09/2019</Table.TextCell>
        <Table.TextCell className={style.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Table.TextCell>
      </Table.Row>
  </Table.Body>
)

const buildHeader = () => (
  <Table.Head>
    <Table.TextHeaderCell>
      Movimentações
    </Table.TextHeaderCell>
  </Table.Head>
)

const buildTable = () => {
  return(
    <Table className={style.changesTable}>
      {buildHeader()}
      {buildBody()}
    </Table>
  )
}

const ListOfChanges = () => buildTable()

export default ListOfChanges
