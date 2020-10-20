import {authenticate} from '@loopback/authentication';
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
import {Pacote} from '../models';
import {PacoteRepository} from '../repositories';

export class PacoteController {
  constructor(
    @repository(PacoteRepository)
    public pacoteRepository : PacoteRepository,
  ) {}

  @authenticate('jwt')
  @post('/pacotes', {
    responses: {
      '200': {
        description: 'Pacote model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pacote)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pacote, {
            title: 'NewPacote',
            exclude: ['id'],
          }),
        },
      },
    })
    pacote: Omit<Pacote, 'id'>,
  ): Promise<Pacote> {
    return this.pacoteRepository.create(pacote);
  }

  @authenticate('jwt')
  @get('/pacotes/count', {
    responses: {
      '200': {
        description: 'Pacote model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Pacote) where?: Where<Pacote>,
  ): Promise<Count> {
    return this.pacoteRepository.count(where);
  }

  @authenticate('jwt')
  @get('/pacotes', {
    responses: {
      '200': {
        description: 'Array of Pacote model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pacote, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pacote) filter?: Filter<Pacote>,
  ): Promise<Pacote[]> {
    return this.pacoteRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/pacotes', {
    responses: {
      '200': {
        description: 'Pacote PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pacote, {partial: true}),
        },
      },
    })
    pacote: Pacote,
    @param.where(Pacote) where?: Where<Pacote>,
  ): Promise<Count> {
    return this.pacoteRepository.updateAll(pacote, where);
  }

  @authenticate('jwt')
  @get('/pacotes/{id}', {
    responses: {
      '200': {
        description: 'Pacote model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pacote, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pacote, {exclude: 'where'}) filter?: FilterExcludingWhere<Pacote>
  ): Promise<Pacote> {
    return this.pacoteRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/pacotes/{id}', {
    responses: {
      '204': {
        description: 'Pacote PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pacote, {partial: true}),
        },
      },
    })
    pacote: Pacote,
  ): Promise<void> {
    await this.pacoteRepository.updateById(id, pacote);
  }

  @authenticate('jwt')
  @put('/pacotes/{id}', {
    responses: {
      '204': {
        description: 'Pacote PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pacote: Pacote,
  ): Promise<void> {
    await this.pacoteRepository.replaceById(id, pacote);
  }

  @authenticate('jwt')
  @del('/pacotes/{id}', {
    responses: {
      '204': {
        description: 'Pacote DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pacoteRepository.deleteById(id);
  }
}
