import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Aluno, AlunoRelations, Pacote, Treino} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PacoteRepository} from './pacote.repository';
import {TreinoRepository} from './treino.repository';

export class AlunoRepository extends DefaultCrudRepository<
  Aluno,
  typeof Aluno.prototype.id,
  AlunoRelations
> {

  public readonly pacote: BelongsToAccessor<Pacote, typeof Aluno.prototype.id>;

  public readonly treinos: HasManyRepositoryFactory<Treino, typeof Aluno.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PacoteRepository') protected pacoteRepositoryGetter: Getter<PacoteRepository>, @repository.getter('TreinoRepository') protected treinoRepositoryGetter: Getter<TreinoRepository>,
  ) {
    super(Aluno, dataSource);
    this.treinos = this.createHasManyRepositoryFactoryFor('treinos', treinoRepositoryGetter,);
    this.registerInclusionResolver('treinos', this.treinos.inclusionResolver);
    this.pacote = this.createBelongsToAccessorFor('pacote', pacoteRepositoryGetter,);
    this.registerInclusionResolver('pacote', this.pacote.inclusionResolver);
  }
}
