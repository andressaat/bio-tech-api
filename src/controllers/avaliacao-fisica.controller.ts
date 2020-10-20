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
import {AvaliacaoFisica} from '../models';
import {AvaliacaoFisicaRepository} from '../repositories';

export class AvaliacaoFisicaController {
  constructor(
    @repository(AvaliacaoFisicaRepository)
    public avaliacaoFisicaRepository : AvaliacaoFisicaRepository,
  ) {}

  @authenticate('jwt')
  @post('/avaliacoes-fisicas', {
    responses: {
      '200': {
        description: 'AvaliacaoFisica model instance',
        content: {'application/json': {schema: getModelSchemaRef(AvaliacaoFisica)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AvaliacaoFisica, {
            title: 'NewAvaliacaoFisica',
            exclude: ['id'],
          }),
        },
      },
    })
    avaliacaoFisica: Omit<AvaliacaoFisica, 'id'>,
  ): Promise<AvaliacaoFisica> {
    return this.avaliacaoFisicaRepository.create(avaliacaoFisica);
  }

  @authenticate('jwt')
  @get('/avaliacoes-fisicas/count', {
    responses: {
      '200': {
        description: 'AvaliacaoFisica model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AvaliacaoFisica) where?: Where<AvaliacaoFisica>,
  ): Promise<Count> {
    return this.avaliacaoFisicaRepository.count(where);
  }

  @authenticate('jwt')
  @get('/avaliacoes-fisicas', {
    responses: {
      '200': {
        description: 'Array of AvaliacaoFisica model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AvaliacaoFisica, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AvaliacaoFisica) filter?: Filter<AvaliacaoFisica>,
  ): Promise<AvaliacaoFisica[]> {
    return this.avaliacaoFisicaRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/avaliacoes-fisicas', {
    responses: {
      '200': {
        description: 'AvaliacaoFisica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AvaliacaoFisica, {partial: true}),
        },
      },
    })
    avaliacaoFisica: AvaliacaoFisica,
    @param.where(AvaliacaoFisica) where?: Where<AvaliacaoFisica>,
  ): Promise<Count> {
    return this.avaliacaoFisicaRepository.updateAll(avaliacaoFisica, where);
  }

  @authenticate('jwt')
  @get('/avaliacoes-fisicas/{id}', {
    responses: {
      '200': {
        description: 'AvaliacaoFisica model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AvaliacaoFisica, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AvaliacaoFisica, {exclude: 'where'}) filter?: FilterExcludingWhere<AvaliacaoFisica>
  ): Promise<AvaliacaoFisica> {
    return this.avaliacaoFisicaRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/avaliacoes-fisicas/{id}', {
    responses: {
      '204': {
        description: 'AvaliacaoFisica PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AvaliacaoFisica, {partial: true}),
        },
      },
    })
    avaliacaoFisica: AvaliacaoFisica,
  ): Promise<void> {
    await this.avaliacaoFisicaRepository.updateById(id, avaliacaoFisica);
  }

  @authenticate('jwt')
  @put('/avaliacoes-fisicas/{id}', {
    responses: {
      '204': {
        description: 'AvaliacaoFisica PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() avaliacaoFisica: AvaliacaoFisica,
  ): Promise<void> {
    await this.avaliacaoFisicaRepository.replaceById(id, avaliacaoFisica);
  }

  @authenticate('jwt')
  @del('/avaliacoes-fisicas/{id}', {
    responses: {
      '204': {
        description: 'AvaliacaoFisica DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.avaliacaoFisicaRepository.deleteById(id);
  }
}
