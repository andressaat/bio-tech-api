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
  Treino,
} from '../models';
import {AlunoRepository} from '../repositories';

export class AlunoTreinoController {
  constructor(
    @repository(AlunoRepository) protected alunoRepository: AlunoRepository,
  ) { }

  @get('/alunos/{id}/treinos', {
    responses: {
      '200': {
        description: 'Array of Aluno has many Treino',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Treino)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Treino>,
  ): Promise<Treino[]> {
    return this.alunoRepository.treinos(id).find(filter);
  }

  @post('/alunos/{id}/treinos', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Treino)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Aluno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treino, {
            title: 'NewTreinoInAluno',
            exclude: ['id'],
            optional: ['alunoId']
          }),
        },
      },
    }) treino: Omit<Treino, 'id'>,
  ): Promise<Treino> {
    return this.alunoRepository.treinos(id).create(treino);
  }

  @patch('/alunos/{id}/treinos', {
    responses: {
      '200': {
        description: 'Aluno.Treino PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treino, {partial: true}),
        },
      },
    })
    treino: Partial<Treino>,
    @param.query.object('where', getWhereSchemaFor(Treino)) where?: Where<Treino>,
  ): Promise<Count> {
    return this.alunoRepository.treinos(id).patch(treino, where);
  }

  @del('/alunos/{id}/treinos', {
    responses: {
      '200': {
        description: 'Aluno.Treino DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Treino)) where?: Where<Treino>,
  ): Promise<Count> {
    return this.alunoRepository.treinos(id).delete(where);
  }
}
