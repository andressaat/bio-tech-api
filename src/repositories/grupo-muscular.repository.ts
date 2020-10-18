import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GrupoMuscular, GrupoMuscularRelations, Exercicio} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ExercicioRepository} from './exercicio.repository';

export class GrupoMuscularRepository extends DefaultCrudRepository<
  GrupoMuscular,
  typeof GrupoMuscular.prototype.id,
  GrupoMuscularRelations
> {

  public readonly exercicios: HasManyRepositoryFactory<Exercicio, typeof GrupoMuscular.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExercicioRepository') protected exercicioRepositoryGetter: Getter<ExercicioRepository>,
  ) {
    super(GrupoMuscular, dataSource);
    this.exercicios = this.createHasManyRepositoryFactoryFor('exercicios', exercicioRepositoryGetter,);
    this.registerInclusionResolver('exercicios', this.exercicios.inclusionResolver);
  }
}
