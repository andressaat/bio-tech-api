import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Exercicio, TreinoExercicio
} from '../models';
import {TreinoExercicioRepository} from '../repositories';

export class TreinoExercicioExercicioController {
  constructor(
    @repository(TreinoExercicioRepository)
    public treinoExercicioRepository: TreinoExercicioRepository,
  ) { }

  @authenticate('jwt')
  @get('/treino-exercicios/{id}/exercicio', {
    responses: {
      '200': {
        description: 'Exercicio belonging to TreinoExercicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exercicio)},
          },
        },
      },
    },
  })
  async getExercicio(
    @param.path.number('id') id: typeof TreinoExercicio.prototype.id,
  ): Promise<Exercicio> {
    return this.treinoExercicioRepository.exercicio(id);
  }
}
