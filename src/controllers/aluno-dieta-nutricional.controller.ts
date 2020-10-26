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
  Aluno,
  DietaNutricional,
} from '../models';
import {AlunoRepository} from '../repositories';

export class AlunoDietaNutricionalController {
  constructor(
    @repository(AlunoRepository) protected alunoRepository: AlunoRepository,
  ) { }

  @get('/alunos/{id}/dieta-nutricionals', {
    responses: {
      '200': {
        description: 'Array of Aluno has many DietaNutricional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DietaNutricional)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DietaNutricional>,
  ): Promise<DietaNutricional[]> {
    return this.alunoRepository.dietaNutricional(id).find(filter);
  }

  @post('/alunos/{id}/dieta-nutricionals', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: {'application/json': {schema: getModelSchemaRef(DietaNutricional)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Aluno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DietaNutricional, {
            title: 'NewDietaNutricionalInAluno',
            exclude: ['id'],
            optional: ['alunoId']
          }),
        },
      },
    }) dietaNutricional: Omit<DietaNutricional, 'id'>,
  ): Promise<DietaNutricional> {
    return this.alunoRepository.dietaNutricional(id).create(dietaNutricional);
  }

  @patch('/alunos/{id}/dieta-nutricionals', {
    responses: {
      '200': {
        description: 'Aluno.DietaNutricional PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DietaNutricional, {partial: true}),
        },
      },
    })
    dietaNutricional: Partial<DietaNutricional>,
    @param.query.object('where', getWhereSchemaFor(DietaNutricional)) where?: Where<DietaNutricional>,
  ): Promise<Count> {
    return this.alunoRepository.dietaNutricional(id).patch(dietaNutricional, where);
  }

  @del('/alunos/{id}/dieta-nutricionals', {
    responses: {
      '200': {
        description: 'Aluno.DietaNutricional DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DietaNutricional)) where?: Where<DietaNutricional>,
  ): Promise<Count> {
    return this.alunoRepository.dietaNutricional(id).delete(where);
  }
}
