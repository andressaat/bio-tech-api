import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {Aluno, RolesTypes} from '../models';
import {AlunoRepository} from '../repositories';

export class AlunoController {
  constructor(
    @repository(AlunoRepository)
    public alunoRepository : AlunoRepository,
  ) {}

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @post('/alunos', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aluno)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {
            title: 'NewAluno',
            exclude: ['id'],
          }),
        },
      },
    })
    aluno: Omit<Aluno, 'id'>,
  ): Promise<Aluno> {
    return this.alunoRepository.create(aluno);
  }

  @authenticate('jwt')
  @get('/alunos/count', {
    responses: {
      '200': {
        description: 'Aluno model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Aluno) where?: Where<Aluno>,
  ): Promise<Count> {
    return this.alunoRepository.count(where);
  }

  @authenticate('jwt')
  @get('/alunos', {
    responses: {
      '200': {
        description: 'Array of Aluno model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Aluno, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Aluno) filter?: Filter<Aluno>,
  ): Promise<Aluno[]> {
    return this.alunoRepository.find(filter);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @patch('/alunos', {
    responses: {
      '200': {
        description: 'Aluno PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {partial: true}),
        },
      },
    })
    aluno: Aluno,
    @param.where(Aluno) where?: Where<Aluno>,
  ): Promise<Count> {
    return this.alunoRepository.updateAll(aluno, where);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @get('/alunos/{id}', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aluno, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Aluno, {exclude: 'where'}) filter?: FilterExcludingWhere<Aluno>
  ): Promise<Aluno> {
    return this.alunoRepository.findById(id, filter);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @patch('/alunos/{id}', {
    responses: {
      '204': {
        description: 'Aluno PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {partial: true}),
        },
      },
    })
    aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.updateById(id, aluno);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @put('/alunos/{id}', {
    responses: {
      '204': {
        description: 'Aluno PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.replaceById(id, aluno);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente]})
  @authenticate('jwt')
  @del('/alunos/{id}', {
    responses: {
      '204': {
        description: 'Aluno DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alunoRepository.deleteById(id);
  }
}
