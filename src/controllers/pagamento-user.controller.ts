import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Pagamento,
  User
} from '../models';
import {PagamentoRepository} from '../repositories';

export class PagamentoUserController {
  constructor(
    @repository(PagamentoRepository)
    public pagamentoRepository: PagamentoRepository,
  ) { }

  @authenticate('jwt')
  @get('/pagamentos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Pagamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Pagamento.prototype.id,
  ): Promise<User> {
    return this.pagamentoRepository.user(id);
  }
}
