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
import {Treino, TreinoDTO, TreinoExercicio} from '../models';
import {TreinoRepository} from '../repositories';

export class TreinoController {
  constructor(
    @repository(TreinoRepository)
    public treinoRepository : TreinoRepository,
  ) {}

  @post('/treinos', {
    responses: {
      '200': {
        description: 'Treino model instance',
        content: {'application/json': {schema: getModelSchemaRef(TreinoDTO)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TreinoDTO, {
            title: 'NewTreinoDTO',
            exclude: ['id'],
          }),
        },
      },
    })
    treino: Omit<TreinoDTO, 'id'>,
  ): Promise<Treino> {
    const exercicios: TreinoExercicio[] = treino.exercicios;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (treino as any).exercicios;
    const createdTreino = await this.treinoRepository.create(treino);

    const promises = exercicios.map(exercicio=>
      this.treinoRepository.exercicios(createdTreino.id).create(exercicio)
    );

    await Promise.all(promises);

    return createdTreino;
  }

  @get('/treinos/count', {
    responses: {
      '200': {
        description: 'Treino model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Treino) where?: Where<Treino>,
  ): Promise<Count> {
    return this.treinoRepository.count(where);
  }

  @get('/treinos', {
    responses: {
      '200': {
        description: 'Array of Treino model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Treino, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Treino) filter?: Filter<Treino>,
  ): Promise<Treino[]> {
    return this.treinoRepository.find(filter);
  }

  @patch('/treinos', {
    responses: {
      '200': {
        description: 'Treino PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treino, {partial: true}),
        },
      },
    })
    treino: Treino,
    @param.where(Treino) where?: Where<Treino>,
  ): Promise<Count> {
    return this.treinoRepository.updateAll(treino, where);
  }

  @get('/treinos/{id}', {
    responses: {
      '200': {
        description: 'Treino model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Treino, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Treino, {exclude: 'where'}) filter?: FilterExcludingWhere<Treino>
  ): Promise<Treino> {
    return this.treinoRepository.findById(id, filter);
  }

  @patch('/treinos/{id}', {
    responses: {
      '204': {
        description: 'Treino PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Treino, {partial: true}),
        },
      },
    })
    treino: Treino,
  ): Promise<void> {
    await this.treinoRepository.updateById(id, treino);
  }

  @put('/treinos/{id}', {
    responses: {
      '204': {
        description: 'Treino PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() treino: Treino,
  ): Promise<void> {
    await this.treinoRepository.replaceById(id, treino);
  }

  @del('/treinos/{id}', {
    responses: {
      '204': {
        description: 'Treino DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.treinoRepository.deleteById(id);
  }
}
