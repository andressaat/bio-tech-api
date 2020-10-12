import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterBuilder,
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
import {Pagamento, RolesTypes} from '../models';
import {PagamentoRepository} from '../repositories';

export class PagamentoController {
  constructor(
    @repository(PagamentoRepository)
    public pagamentoRepository : PagamentoRepository,
  ) {}

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @post('/pagamentos', {
    responses: {
      '200': {
        description: 'Pagamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagamento)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {
            title: 'NewPagamento',
            exclude: ['id'],
          }),
        },
      },
    })
    pagamento: Omit<Pagamento, 'id'>,
  ): Promise<Pagamento> {
    return this.pagamentoRepository.create(pagamento);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @get('/pagamentos/count', {
    responses: {
      '200': {
        description: 'Pagamento model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Pagamento) where?: Where<Pagamento>,
  ): Promise<Count> {
    return this.pagamentoRepository.count(where);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @get('/pagamentos', {
    responses: {
      '200': {
        description: 'Array of Pagamento model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pagamento, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pagamento) filter?: Filter<Pagamento>,
  ): Promise<Pagamento[]> {
    const myFilter = new FilterBuilder(filter)
      .include('aluno','user')
      .build();
    return this.pagamentoRepository.find(myFilter);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente]})
  @authenticate('jwt')
  @patch('/pagamentos', {
    responses: {
      '200': {
        description: 'Pagamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {partial: true}),
        },
      },
    })
    pagamento: Pagamento,
    @param.where(Pagamento) where?: Where<Pagamento>,
  ): Promise<Count> {
    return this.pagamentoRepository.updateAll(pagamento, where);
  }


  @authorize({allowedRoles: [RolesTypes.Gerente, RolesTypes.Atendente]})
  @authenticate('jwt')
  @get('/pagamentos/{id}', {
    responses: {
      '200': {
        description: 'Pagamento model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pagamento, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pagamento, {exclude: 'where'}) filter?: FilterExcludingWhere<Pagamento>
  ): Promise<Pagamento> {
    const myFilter = new FilterBuilder(filter)
      .include('aluno','user')
      .build();
    return this.pagamentoRepository.findById(id, myFilter);
  }


  @authorize({allowedRoles: [RolesTypes.Gerente]})
  @authenticate('jwt')
  @patch('/pagamentos/{id}', {
    responses: {
      '204': {
        description: 'Pagamento PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {partial: true}),
        },
      },
    })
    pagamento: Pagamento,
  ): Promise<void> {
    await this.pagamentoRepository.updateById(id, pagamento);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente]})
  @authenticate('jwt')
  @put('/pagamentos/{id}', {
    responses: {
      '204': {
        description: 'Pagamento PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagamento: Pagamento,
  ): Promise<void> {
    await this.pagamentoRepository.replaceById(id, pagamento);
  }

  @authorize({allowedRoles: [RolesTypes.Gerente]})
  @authenticate('jwt')
  @del('/pagamentos/{id}', {
    responses: {
      '204': {
        description: 'Pagamento DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagamentoRepository.deleteById(id);
  }
}
