import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  AvaliacaoFisica,
  User
} from '../models';
import {AvaliacaoFisicaRepository} from '../repositories';

export class AvaliacaoFisicaUserController {
  constructor(
    @repository(AvaliacaoFisicaRepository)
    public avaliacaoFisicaRepository: AvaliacaoFisicaRepository,
  ) { }

  @authenticate('jwt')
  @get('/avaliacao-fisicas/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to AvaliacaoFisica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof AvaliacaoFisica.prototype.id,
  ): Promise<User> {
    return this.avaliacaoFisicaRepository.user(id);
  }
}
