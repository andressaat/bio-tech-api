import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Aluno, Treino
} from '../models';
import {TreinoRepository} from '../repositories';

export class TreinoAlunoController {
  constructor(
    @repository(TreinoRepository)
    public treinoRepository: TreinoRepository,
  ) { }

  @authenticate('jwt')
  @get('/treinos/{id}/aluno', {
    responses: {
      '200': {
        description: 'Aluno belonging to Treino',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aluno)},
          },
        },
      },
    },
  })
  async getAluno(
    @param.path.number('id') id: typeof Treino.prototype.id,
  ): Promise<Aluno> {
    return this.treinoRepository.aluno(id);
  }
}
