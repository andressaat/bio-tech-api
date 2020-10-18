import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Exercicio, ExercicioRelations, GrupoMuscular} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrupoMuscularRepository} from './grupo-muscular.repository';

export class ExercicioRepository extends DefaultCrudRepository<
  Exercicio,
  typeof Exercicio.prototype.id,
  ExercicioRelations
> {

  public readonly grupo: BelongsToAccessor<GrupoMuscular, typeof Exercicio.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GrupoMuscularRepository') protected grupoMuscularRepositoryGetter: Getter<GrupoMuscularRepository>,
  ) {
    super(Exercicio, dataSource);
    this.grupo = this.createBelongsToAccessorFor('grupo', grupoMuscularRepositoryGetter,);
    this.registerInclusionResolver('grupo', this.grupo.inclusionResolver);
  }
}
