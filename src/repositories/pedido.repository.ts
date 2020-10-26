import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pedido, PedidoRelations, ItemPedido} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ItemPedidoRepository} from './item-pedido.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly itens: HasManyRepositoryFactory<ItemPedido, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ItemPedidoRepository') protected itemPedidoRepositoryGetter: Getter<ItemPedidoRepository>,
  ) {
    super(Pedido, dataSource);
    this.itens = this.createHasManyRepositoryFactoryFor('itens', itemPedidoRepositoryGetter,);
    this.registerInclusionResolver('itens', this.itens.inclusionResolver);
  }
}
