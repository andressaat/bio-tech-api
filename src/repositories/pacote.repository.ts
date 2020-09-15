import {DefaultCrudRepository} from '@loopback/repository';
import {Pacote, PacoteRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PacoteRepository extends DefaultCrudRepository<
  Pacote,
  typeof Pacote.prototype.id,
  PacoteRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pacote, dataSource);
  }
}
