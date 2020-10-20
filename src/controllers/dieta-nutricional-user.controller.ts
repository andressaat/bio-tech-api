import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  DietaNutricional,
  User
} from '../models';
import {DietaNutricionalRepository} from '../repositories';

export class DietaNutricionalUserController {
  constructor(
    @repository(DietaNutricionalRepository)
    public dietaNutricionalRepository: DietaNutricionalRepository,
  ) { }

  @authenticate('jwt')
  @get('/dieta-nutricionals/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to DietaNutricional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof DietaNutricional.prototype.id,
  ): Promise<User> {
    return this.dietaNutricionalRepository.user(id);
  }
}
