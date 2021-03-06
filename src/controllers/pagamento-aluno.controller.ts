import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Aluno, Pagamento
} from '../models';
import {PagamentoRepository} from '../repositories';

export class PagamentoAlunoController {
  constructor(
    @repository(PagamentoRepository)
    public pagamentoRepository: PagamentoRepository,
  ) { }

  @authenticate('jwt')
  @get('/pagamentos/{id}/aluno', {
    responses: {
      '200': {
        description: 'Aluno belonging to Pagamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aluno)},
          },
        },
      },
    },
  })
  async getAluno(
    @param.path.string('id') id: typeof Pagamento.prototype.id,
  ): Promise<Aluno> {
    return this.pagamentoRepository.aluno(id);
  }
}
