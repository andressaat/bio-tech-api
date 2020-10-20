import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Aluno, AvaliacaoFisica
} from '../models';
import {AvaliacaoFisicaRepository} from '../repositories';

export class AvaliacaoFisicaAlunoController {
  constructor(
    @repository(AvaliacaoFisicaRepository)
    public avaliacaoFisicaRepository: AvaliacaoFisicaRepository,
  ) { }

  @authenticate('jwt')
  @get('/avaliacao-fisicas/{id}/aluno', {
    responses: {
      '200': {
        description: 'Aluno belonging to AvaliacaoFisica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aluno)},
          },
        },
      },
    },
  })
  async getAluno(
    @param.path.number('id') id: typeof AvaliacaoFisica.prototype.id,
  ): Promise<Aluno> {
    return this.avaliacaoFisicaRepository.aluno(id);
  }
}
