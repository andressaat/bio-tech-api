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
  AvaliacaoFisica,
} from '../models';
import {AlunoRepository} from '../repositories';

export class AlunoAvaliacaoFisicaController {
  constructor(
    @repository(AlunoRepository) protected alunoRepository: AlunoRepository,
  ) { }

  @get('/alunos/{id}/avaliacao-fisicas', {
    responses: {
      '200': {
        description: 'Array of Aluno has many AvaliacaoFisica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AvaliacaoFisica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AvaliacaoFisica>,
  ): Promise<AvaliacaoFisica[]> {
    return this.alunoRepository.avaliacoesFisicas(id).find(filter);
  }

  @post('/alunos/{id}/avaliacao-fisicas', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: {'application/json': {schema: getModelSchemaRef(AvaliacaoFisica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Aluno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AvaliacaoFisica, {
            title: 'NewAvaliacaoFisicaInAluno',
            exclude: ['id'],
            optional: ['alunoId']
          }),
        },
      },
    }) avaliacaoFisica: Omit<AvaliacaoFisica, 'id'>,
  ): Promise<AvaliacaoFisica> {
    return this.alunoRepository.avaliacoesFisicas(id).create(avaliacaoFisica);
  }

  @patch('/alunos/{id}/avaliacao-fisicas', {
    responses: {
      '200': {
        description: 'Aluno.AvaliacaoFisica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AvaliacaoFisica, {partial: true}),
        },
      },
    })
    avaliacaoFisica: Partial<AvaliacaoFisica>,
    @param.query.object('where', getWhereSchemaFor(AvaliacaoFisica)) where?: Where<AvaliacaoFisica>,
  ): Promise<Count> {
    return this.alunoRepository.avaliacoesFisicas(id).patch(avaliacaoFisica, where);
  }

  @del('/alunos/{id}/avaliacao-fisicas', {
    responses: {
      '200': {
        description: 'Aluno.AvaliacaoFisica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AvaliacaoFisica)) where?: Where<AvaliacaoFisica>,
  ): Promise<Count> {
    return this.alunoRepository.avaliacoesFisicas(id).delete(where);
  }
}
