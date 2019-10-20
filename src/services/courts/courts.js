import httpRequest from '../../gateway/http_request'

const courtsService = (client = httpRequest) => (
  {
    get: () => (client().get('/courts'))
  }
)

export default courtsService
