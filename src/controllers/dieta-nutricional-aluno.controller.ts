import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Aluno, DietaNutricional
} from '../models';
import {DietaNutricionalRepository} from '../repositories';

export class DietaNutricionalAlunoController {
  constructor(
    @repository(DietaNutricionalRepository)
    public dietaNutricionalRepository: DietaNutricionalRepository,
  ) { }

  @authenticate('jwt')
  @get('/dieta-nutricionals/{id}/aluno', {
    responses: {
      '200': {
        description: 'Aluno belonging to DietaNutricional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aluno)},
          },
        },
      },
    },
  })
  async getAluno(
    @param.path.number('id') id: typeof DietaNutricional.prototype.id,
  ): Promise<Aluno> {
    return this.dietaNutricionalRepository.aluno(id);
  }
}
