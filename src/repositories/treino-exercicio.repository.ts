import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TreinoExercicio, TreinoExercicioRelations, Treino, Exercicio} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TreinoRepository} from './treino.repository';
import {ExercicioRepository} from './exercicio.repository';

export class TreinoExercicioRepository extends DefaultCrudRepository<
  TreinoExercicio,
  typeof TreinoExercicio.prototype.id,
  TreinoExercicioRelations
> {

  public readonly treino: BelongsToAccessor<Treino, typeof TreinoExercicio.prototype.id>;

  public readonly exercicio: BelongsToAccessor<Exercicio, typeof TreinoExercicio.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TreinoRepository') protected treinoRepositoryGetter: Getter<TreinoRepository>, @repository.getter('ExercicioRepository') protected exercicioRepositoryGetter: Getter<ExercicioRepository>,
  ) {
    super(TreinoExercicio, dataSource);
    this.exercicio = this.createBelongsToAccessorFor('exercicio', exercicioRepositoryGetter,);
    this.registerInclusionResolver('exercicio', this.exercicio.inclusionResolver);
    this.treino = this.createBelongsToAccessorFor('treino', treinoRepositoryGetter,);
    this.registerInclusionResolver('treino', this.treino.inclusionResolver);
  }
}
