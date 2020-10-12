import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pagamento,
  Aluno,
} from '../models';
import {PagamentoRepository} from '../repositories';

export class PagamentoAlunoController {
  constructor(
    @repository(PagamentoRepository)
    public pagamentoRepository: PagamentoRepository,
  ) { }

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
