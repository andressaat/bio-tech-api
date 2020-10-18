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
import {GrupoMuscular} from '../models';
import {GrupoMuscularRepository} from '../repositories';

export class GrupoMuscularController {
  constructor(
    @repository(GrupoMuscularRepository)
    public grupoMuscularRepository : GrupoMuscularRepository,
  ) {}

  @post('/grupo-muscular', {
    responses: {
      '200': {
        description: 'GrupoMuscular model instance',
        content: {'application/json': {schema: getModelSchemaRef(GrupoMuscular)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoMuscular, {
            title: 'NewGrupoMuscular',
            exclude: ['id'],
          }),
        },
      },
    })
    grupoMuscular: Omit<GrupoMuscular, 'id'>,
  ): Promise<GrupoMuscular> {
    return this.grupoMuscularRepository.create(grupoMuscular);
  }

  @get('/grupo-muscular/count', {
    responses: {
      '200': {
        description: 'GrupoMuscular model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GrupoMuscular) where?: Where<GrupoMuscular>,
  ): Promise<Count> {
    return this.grupoMuscularRepository.count(where);
  }

  @get('/grupo-muscular', {
    responses: {
      '200': {
        description: 'Array of GrupoMuscular model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GrupoMuscular, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GrupoMuscular) filter?: Filter<GrupoMuscular>,
  ): Promise<GrupoMuscular[]> {
    return this.grupoMuscularRepository.find(filter);
  }

  @patch('/grupo-muscular', {
    responses: {
      '200': {
        description: 'GrupoMuscular PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoMuscular, {partial: true}),
        },
      },
    })
    grupoMuscular: GrupoMuscular,
    @param.where(GrupoMuscular) where?: Where<GrupoMuscular>,
  ): Promise<Count> {
    return this.grupoMuscularRepository.updateAll(grupoMuscular, where);
  }

  @get('/grupo-muscular/{id}', {
    responses: {
      '200': {
        description: 'GrupoMuscular model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrupoMuscular, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GrupoMuscular, {exclude: 'where'}) filter?: FilterExcludingWhere<GrupoMuscular>
  ): Promise<GrupoMuscular> {
    return this.grupoMuscularRepository.findById(id, filter);
  }

  @patch('/grupo-muscular/{id}', {
    responses: {
      '204': {
        description: 'GrupoMuscular PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrupoMuscular, {partial: true}),
        },
      },
    })
    grupoMuscular: GrupoMuscular,
  ): Promise<void> {
    await this.grupoMuscularRepository.updateById(id, grupoMuscular);
  }

  @put('/grupo-muscular/{id}', {
    responses: {
      '204': {
        description: 'GrupoMuscular PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() grupoMuscular: GrupoMuscular,
  ): Promise<void> {
    await this.grupoMuscularRepository.replaceById(id, grupoMuscular);
  }

  @del('/grupo-muscular/{id}', {
    responses: {
      '204': {
        description: 'GrupoMuscular DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.grupoMuscularRepository.deleteById(id);
  }
}
