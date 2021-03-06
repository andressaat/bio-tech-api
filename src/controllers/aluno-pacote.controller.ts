import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Aluno,
  Pacote
} from '../models';
import {AlunoRepository} from '../repositories';

export class AlunoPacoteController {
  constructor(
    @repository(AlunoRepository)
    public alunoRepository: AlunoRepository,
  ) { }

  @authenticate('jwt')
  @get('/alunos/{id}/pacote', {
    responses: {
      '200': {
        description: 'Pacote belonging to Aluno',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pacote)},
          },
        },
      },
    },
  })
  async getPacote(
    @param.path.number('id') id: typeof Aluno.prototype.id,
  ): Promise<Pacote> {
    return this.alunoRepository.pacote(id);
  }
}
