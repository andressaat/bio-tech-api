import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Treino,
  TreinoExercicio,
} from '../models';
import {TreinoRepository} from '../repositories';

export class TreinoTreinoExercicioController {
  constructor(
    @repository(TreinoRepository) protected treinoRepository: TreinoRepository,
  ) { }

  @get('/treinos/{id}/treino-exercicios', {
    responses: {
      '200': {
        description: 'Array of Treino has many TreinoExercicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TreinoExercicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TreinoExercicio>,
  ): Promise<TreinoExercicio[]> {
    return this.treinoRepository.exercicios(id).find(filter);
  }

  @post('/treinos/{id}/treino-exercicios', {
    responses: {
      '200': {
        description: 'Treino model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreinoExercicio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Treino.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreinoExercicio, {
            title: 'NewTreinoExercicioInTreino',
            exclude: ['id'],
            optional: ['treinoId']
          }),
        },
      },
    }) treinoExercicio: Omit<TreinoExercicio, 'id'>,
  ): Promise<TreinoExercicio> {
    return this.treinoRepository.exercicios(id).create(treinoExercicio);
  }

  @patch('/treinos/{id}/treino-exercicios', {
    responses: {
      '200': {
        description: 'Treino.TreinoExercicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreinoExercicio, {partial: true}),
        },
      },
    })
    treinoExercicio: Partial<TreinoExercicio>,
    @param.query.object('where', getWhereSchemaFor(TreinoExercicio)) where?: Where<TreinoExercicio>,
  ): Promise<Count> {
    return this.treinoRepository.exercicios(id).patch(treinoExercicio, where);
  }

  @del('/treinos/{id}/treino-exercicios', {
    responses: {
      '200': {
        description: 'Treino.TreinoExercicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TreinoExercicio)) where?: Where<TreinoExercicio>,
  ): Promise<Count> {
    return this.treinoRepository.exercicios(id).delete(where);
  }
}
