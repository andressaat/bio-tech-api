import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Treino, TreinoRelations, TreinoExercicio, Aluno} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TreinoExercicioRepository} from './treino-exercicio.repository';
import {AlunoRepository} from './aluno.repository';

export class TreinoRepository extends DefaultCrudRepository<
  Treino,
  typeof Treino.prototype.id,
  TreinoRelations
> {

  public readonly exercicios: HasManyRepositoryFactory<TreinoExercicio, typeof Treino.prototype.id>;

  public readonly aluno: BelongsToAccessor<Aluno, typeof Treino.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TreinoExercicioRepository') protected treinoExercicioRepositoryGetter: Getter<TreinoExercicioRepository>, @repository.getter('AlunoRepository') protected alunoRepositoryGetter: Getter<AlunoRepository>,
  ) {
    super(Treino, dataSource);
    this.aluno = this.createBelongsToAccessorFor('aluno', alunoRepositoryGetter,);
    this.registerInclusionResolver('aluno', this.aluno.inclusionResolver);
    this.exercicios = this.createHasManyRepositoryFactoryFor('exercicios', treinoExercicioRepositoryGetter,);
    this.registerInclusionResolver('exercicios', this.exercicios.inclusionResolver);
  }
}
