import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ItemPedido,
  Pedido,
} from '../models';
import {ItemPedidoRepository} from '../repositories';

export class ItemPedidoPedidoController {
  constructor(
    @repository(ItemPedidoRepository)
    public itemPedidoRepository: ItemPedidoRepository,
  ) { }

  @get('/item-pedidos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to ItemPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.number('id') id: typeof ItemPedido.prototype.id,
  ): Promise<Pedido> {
    return this.itemPedidoRepository.pedido(id);
  }
}
