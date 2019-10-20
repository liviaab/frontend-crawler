import nock from 'nock'
import processesService from './processes'
import processResponse from '../../fixtures/process'

describe('processesService module', () => {
  beforeEach(() => {
    process.env.REACT_APP_BASE_URL = 'http://base.url/api/v1'
  })

  it('gets the information of a process using its number', async () => {
    const processNumber = '0067154-55.2010.8.02.0001'

    nock(process.env.REACT_APP_BASE_URL)
      .get(`/processes/${processNumber}`)
      .reply(200, processResponse, { 'Content-Type': 'application/json' })

    const response = await processesService().get(processNumber)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(processResponse)
  })
})
