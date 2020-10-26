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
  Produto,
} from '../models';
import {ItemPedidoRepository} from '../repositories';

export class ItemPedidoProdutoController {
  constructor(
    @repository(ItemPedidoRepository)
    public itemPedidoRepository: ItemPedidoRepository,
  ) { }

  @get('/item-pedidos/{id}/produto', {
    responses: {
      '200': {
        description: 'Produto belonging to ItemPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Produto)},
          },
        },
      },
    },
  })
  async getProduto(
    @param.path.number('id') id: typeof ItemPedido.prototype.id,
  ): Promise<Produto> {
    return this.itemPedidoRepository.produto(id);
  }
}
