import nock from 'nock'
import courtsService from './courts'
import courtsResponse from '../../fixtures/courts'

describe('courtsService module', () => {
  beforeEach(() => {
    process.env.REACT_APP_BASE_URL = 'http://base.url/api/v1'
  })

  it('gets all the Courts of Justice', async () => {
    nock(process.env.REACT_APP_BASE_URL)
      .get('/courts')
      .reply(200, courtsResponse, { 'Content-Type': 'application/json' })

    const response = await courtsService().get()
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(courtsResponse)
  })
})
