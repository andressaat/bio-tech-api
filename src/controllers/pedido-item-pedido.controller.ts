import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  ItemPedido,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoItemPedidoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/item-pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many ItemPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemPedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ItemPedido>,
  ): Promise<ItemPedido[]> {
    return this.pedidoRepository.itens(id).find(filter);
  }

  @post('/pedidos/{id}/item-pedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemPedido)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPedido, {
            title: 'NewItemPedidoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) itemPedido: Omit<ItemPedido, 'id'>,
  ): Promise<ItemPedido> {
    return this.pedidoRepository.itens(id).create(itemPedido);
  }

  @patch('/pedidos/{id}/item-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.ItemPedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPedido, {partial: true}),
        },
      },
    })
    itemPedido: Partial<ItemPedido>,
    @param.query.object('where', getWhereSchemaFor(ItemPedido)) where?: Where<ItemPedido>,
  ): Promise<Count> {
    return this.pedidoRepository.itens(id).patch(itemPedido, where);
  }

  @del('/pedidos/{id}/item-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.ItemPedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ItemPedido)) where?: Where<ItemPedido>,
  ): Promise<Count> {
    return this.pedidoRepository.itens(id).delete(where);
  }
}
