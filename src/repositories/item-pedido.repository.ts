import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ItemPedido, ItemPedidoRelations, Produto, Pedido} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProdutoRepository} from './produto.repository';
import {PedidoRepository} from './pedido.repository';

export class ItemPedidoRepository extends DefaultCrudRepository<
  ItemPedido,
  typeof ItemPedido.prototype.id,
  ItemPedidoRelations
> {

  public readonly produto: BelongsToAccessor<Produto, typeof ItemPedido.prototype.id>;

  public readonly pedido: BelongsToAccessor<Pedido, typeof ItemPedido.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProdutoRepository') protected produtoRepositoryGetter: Getter<ProdutoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(ItemPedido, dataSource);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
    this.produto = this.createBelongsToAccessorFor('produto', produtoRepositoryGetter,);
    this.registerInclusionResolver('produto', this.produto.inclusionResolver);
  }
}
