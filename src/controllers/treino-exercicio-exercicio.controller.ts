import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TreinoExercicio,
  Exercicio,
} from '../models';
import {TreinoExercicioRepository} from '../repositories';

export class TreinoExercicioExercicioController {
  constructor(
    @repository(TreinoExercicioRepository)
    public treinoExercicioRepository: TreinoExercicioRepository,
  ) { }

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
