import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Exercicio, GrupoMuscular
} from '../models';
import {GrupoMuscularRepository} from '../repositories';

export class GrupoMuscularExercicioController {
  constructor(
    @repository(GrupoMuscularRepository) protected grupoMuscularRepository: GrupoMuscularRepository,
  ) { }

  @get('/grupo-muscular/{id}/exercicios', {
    responses: {
      '200': {
        description: 'Array of GrupoMuscular has many Exercicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exercicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Exercicio>,
  ): Promise<Exercicio[]> {
    return this.grupoMuscularRepository.exercicios(id).find(filter);
  }

  @post('/grupo-muscular/{id}/exercicios', {
    responses: {
      '200': {
        description: 'GrupoMuscular model instance',
        content: {'application/json': {schema: getModelSchemaRef(Exercicio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GrupoMuscular.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exercicio, {
            title: 'NewExercicioInGrupoMuscular',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) exercicio: Omit<Exercicio, 'id'>,
  ): Promise<Exercicio> {
    return this.grupoMuscularRepository.exercicios(id).create(exercicio);
  }

  @patch('/grupo-muscular/{id}/exercicios', {
    responses: {
      '200': {
        description: 'GrupoMuscular.Exercicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exercicio, {partial: true}),
        },
      },
    })
    exercicio: Partial<Exercicio>,
    @param.query.object('where', getWhereSchemaFor(Exercicio)) where?: Where<Exercicio>,
  ): Promise<Count> {
    return this.grupoMuscularRepository.exercicios(id).patch(exercicio, where);
  }

  @del('/grupo-muscular/{id}/exercicios', {
    responses: {
      '200': {
        description: 'GrupoMuscular.Exercicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Exercicio)) where?: Where<Exercicio>,
  ): Promise<Count> {
    return this.grupoMuscularRepository.exercicios(id).delete(where);
  }
}
