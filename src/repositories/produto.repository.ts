import {DefaultCrudRepository} from '@loopback/repository';
import {Produto, ProdutoRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProdutoRepository extends DefaultCrudRepository<
  Produto,
  typeof Produto.prototype.id,
  ProdutoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Produto, dataSource);
  }
}
