import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Treino, TreinoExercicio
} from '../models';
import {TreinoExercicioRepository} from '../repositories';

export class TreinoExercicioTreinoController {
  constructor(
    @repository(TreinoExercicioRepository)
    public treinoExercicioRepository: TreinoExercicioRepository,
  ) { }

  @authenticate('jwt')
  @get('/treino-exercicios/{id}/treino', {
    responses: {
      '200': {
        description: 'Treino belonging to TreinoExercicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Treino)},
          },
        },
      },
    },
  })
  async getTreino(
    @param.path.number('id') id: typeof TreinoExercicio.prototype.id,
  ): Promise<Treino> {
    return this.treinoExercicioRepository.treino(id);
  }
}
