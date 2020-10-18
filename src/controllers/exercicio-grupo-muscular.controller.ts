import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Exercicio,
  GrupoMuscular,
} from '../models';
import {ExercicioRepository} from '../repositories';

export class ExercicioGrupoMuscularController {
  constructor(
    @repository(ExercicioRepository)
    public exercicioRepository: ExercicioRepository,
  ) { }

  @get('/exercicios/{id}/grupo-muscular', {
    responses: {
      '200': {
        description: 'GrupoMuscular belonging to Exercicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrupoMuscular)},
          },
        },
      },
    },
  })
  async getGrupoMuscular(
    @param.path.number('id') id: typeof Exercicio.prototype.id,
  ): Promise<GrupoMuscular> {
    return this.exercicioRepository.grupo(id);
  }
}
