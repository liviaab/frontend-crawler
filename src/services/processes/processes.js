import httpRequest from '../../gateway/http_request'

const processesService = (client = httpRequest) => (
  {
    get: (processNumber) => (client().get(`/processes/${processNumber}`))
  }
)

export default processesService
