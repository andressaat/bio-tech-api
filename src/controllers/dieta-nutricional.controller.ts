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
import {DietaNutricional} from '../models';
import {DietaNutricionalRepository} from '../repositories';

export class DietaNutricionalController {
  constructor(
    @repository(DietaNutricionalRepository)
    public dietaNutricionalRepository : DietaNutricionalRepository,
  ) {}

  @authenticate('jwt')
  @post('/dietas-nutricionais', {
    responses: {
      '200': {
        description: 'DietaNutricional model instance',
        content: {'application/json': {schema: getModelSchemaRef(DietaNutricional)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DietaNutricional, {
            title: 'NewDietaNutricional',
            exclude: ['id'],
          }),
        },
      },
    })
    dietaNutricional: Omit<DietaNutricional, 'id'>,
  ): Promise<DietaNutricional> {
    return this.dietaNutricionalRepository.create(dietaNutricional);
  }

  @authenticate('jwt')
  @get('/dietas-nutricionais/count', {
    responses: {
      '200': {
        description: 'DietaNutricional model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DietaNutricional) where?: Where<DietaNutricional>,
  ): Promise<Count> {
    return this.dietaNutricionalRepository.count(where);
  }

  @authenticate('jwt')
  @get('/dietas-nutricionais', {
    responses: {
      '200': {
        description: 'Array of DietaNutricional model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DietaNutricional, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DietaNutricional) filter?: Filter<DietaNutricional>,
  ): Promise<DietaNutricional[]> {
    return this.dietaNutricionalRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/dietas-nutricionais', {
    responses: {
      '200': {
        description: 'DietaNutricional PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DietaNutricional, {partial: true}),
        },
      },
    })
    dietaNutricional: DietaNutricional,
    @param.where(DietaNutricional) where?: Where<DietaNutricional>,
  ): Promise<Count> {
    return this.dietaNutricionalRepository.updateAll(dietaNutricional, where);
  }

  @authenticate('jwt')
  @get('/dietas-nutricionais/{id}', {
    responses: {
      '200': {
        description: 'DietaNutricional model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DietaNutricional, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DietaNutricional, {exclude: 'where'}) filter?: FilterExcludingWhere<DietaNutricional>
  ): Promise<DietaNutricional> {
    return this.dietaNutricionalRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/dietas-nutricionais/{id}', {
    responses: {
      '204': {
        description: 'DietaNutricional PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DietaNutricional, {partial: true}),
        },
      },
    })
    dietaNutricional: DietaNutricional,
  ): Promise<void> {
    await this.dietaNutricionalRepository.updateById(id, dietaNutricional);
  }

  @authenticate('jwt')
  @put('/dietas-nutricionais/{id}', {
    responses: {
      '204': {
        description: 'DietaNutricional PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dietaNutricional: DietaNutricional,
  ): Promise<void> {
    await this.dietaNutricionalRepository.replaceById(id, dietaNutricional);
  }

  @authenticate('jwt')
  @del('/dietas-nutricionais/{id}', {
    responses: {
      '204': {
        description: 'DietaNutricional DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dietaNutricionalRepository.deleteById(id);
  }
}
