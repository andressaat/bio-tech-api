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
import {ItemPedido, Pedido, PedidoDTO} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository : PedidoRepository,
  ) {}

  @post('/pedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoDTO)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoDTO, {
            title: 'NewPedidoDTO',
            exclude: ['id'],
          }),
        },
      },
    })
    pedido: Omit<PedidoDTO, 'id'>,
  ): Promise<Pedido> {
    // return this.pedidoRepository.create(pedido);
    const itens: ItemPedido[] = pedido.itens;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (pedido as any).itens;
    const createdPedido = await this.pedidoRepository.create(pedido);

    const promises = itens.map(item =>
      this.pedidoRepository.itens(createdPedido.id).create(item)
    );

    await Promise.all(promises);

    return createdPedido;
  }

  @get('/pedidos/count', {
    responses: {
      '200': {
        description: 'Pedido model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Pedido) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.pedidoRepository.count(where);
  }

  @get('/pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pedido, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pedido) filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.pedidoRepository.find(filter);
  }

  @patch('/pedidos', {
    responses: {
      '200': {
        description: 'Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Pedido,
    @param.where(Pedido) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.pedidoRepository.updateAll(pedido, where);
  }

  @get('/pedidos/{id}', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pedido, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pedido, {exclude: 'where'}) filter?: FilterExcludingWhere<Pedido>
  ): Promise<Pedido> {
    return this.pedidoRepository.findById(id, filter);
  }

  @patch('/pedidos/{id}', {
    responses: {
      '204': {
        description: 'Pedido PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Pedido,
  ): Promise<void> {
    await this.pedidoRepository.updateById(id, pedido);
  }

  @put('/pedidos/{id}', {
    responses: {
      '204': {
        description: 'Pedido PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pedido: Pedido,
  ): Promise<void> {
    await this.pedidoRepository.replaceById(id, pedido);
  }

  @del('/pedidos/{id}', {
    responses: {
      '204': {
        description: 'Pedido DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidoRepository.deleteById(id);
  }
}
