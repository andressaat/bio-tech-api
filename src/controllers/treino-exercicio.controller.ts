import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TreinoExercicio} from '../models';
import {TreinoExercicioRepository} from '../repositories';

export class TreinoExercicioController {
  constructor(
    @repository(TreinoExercicioRepository)
    public treinoExercicioRepository : TreinoExercicioRepository,
  ) {}

  @post('/treino-exercicios', {
    responses: {
      '200': {
        description: 'TreinoExercicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreinoExercicio)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreinoExercicio, {
            title: 'NewTreinoExercicio',
            exclude: ['id'],
          }),
        },
      },
    })
    treinoExercicio: Omit<TreinoExercicio, 'id'>,
  ): Promise<TreinoExercicio> {
    return this.treinoExercicioRepository.create(treinoExercicio);
  }

  @get('/treino-exercicios/count', {
    responses: {
      '200': {
        description: 'TreinoExercicio model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TreinoExercicio) where?: Where<TreinoExercicio>,
  ): Promise<Count> {
    return this.treinoExercicioRepository.count(where);
  }

  @get('/treino-exercicios', {
    responses: {
      '200': {
        description: 'Array of TreinoExercicio model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TreinoExercicio, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TreinoExercicio) filter?: Filter<TreinoExercicio>,
  ): Promise<TreinoExercicio[]> {
    return this.treinoExercicioRepository.find(filter);
  }

  @patch('/treino-exercicios', {
    responses: {
      '200': {
        description: 'TreinoExercicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreinoExercicio, {partial: true}),
        },
      },
    })
    treinoExercicio: TreinoExercicio,
    @param.where(TreinoExercicio) where?: Where<TreinoExercicio>,
  ): Promise<Count> {
    return this.treinoExercicioRepository.updateAll(treinoExercicio, where);
  }

  @get('/treino-exercicios/{id}', {
    responses: {
      '200': {
        description: 'TreinoExercicio model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreinoExercicio, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TreinoExercicio, {exclude: 'where'}) filter?: FilterExcludingWhere<TreinoExercicio>
  ): Promise<TreinoExercicio> {
    return this.treinoExercicioRepository.findById(id, filter);
  }

  @patch('/treino-exercicios/{id}', {
    responses: {
      '204': {
        description: 'TreinoExercicio PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreinoExercicio, {partial: true}),
        },
      },
    })
    treinoExercicio: TreinoExercicio,
  ): Promise<void> {
    await this.treinoExercicioRepository.updateById(id, treinoExercicio);
  }

  @put('/treino-exercicios/{id}', {
    responses: {
      '204': {
        description: 'TreinoExercicio PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treinoExercicio: TreinoExercicio,
  ): Promise<void> {
    await this.treinoExercicioRepository.replaceById(id, treinoExercicio);
  }

  @del('/treino-exercicios/{id}', {
    responses: {
      '204': {
        description: 'TreinoExercicio DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treinoExercicioRepository.deleteById(id);
  }
}
