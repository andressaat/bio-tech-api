import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Aluno, AlunoRelations, Pacote, Treino, AvaliacaoFisica, DietaNutricional} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PacoteRepository} from './pacote.repository';
import {TreinoRepository} from './treino.repository';
import {AvaliacaoFisicaRepository} from './avaliacao-fisica.repository';
import {DietaNutricionalRepository} from './dieta-nutricional.repository';

export class AlunoRepository extends DefaultCrudRepository<
  Aluno,
  typeof Aluno.prototype.id,
  AlunoRelations
> {

  public readonly pacote: BelongsToAccessor<Pacote, typeof Aluno.prototype.id>;

  public readonly treinos: HasManyRepositoryFactory<Treino, typeof Aluno.prototype.id>;

  public readonly avaliacoesFisicas: HasManyRepositoryFactory<AvaliacaoFisica, typeof Aluno.prototype.id>;

  public readonly dietaNutricional: HasManyRepositoryFactory<DietaNutricional, typeof Aluno.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PacoteRepository') protected pacoteRepositoryGetter: Getter<PacoteRepository>, @repository.getter('TreinoRepository') protected treinoRepositoryGetter: Getter<TreinoRepository>, @repository.getter('AvaliacaoFisicaRepository') protected avaliacaoFisicaRepositoryGetter: Getter<AvaliacaoFisicaRepository>, @repository.getter('DietaNutricionalRepository') protected dietaNutricionalRepositoryGetter: Getter<DietaNutricionalRepository>,
  ) {
    super(Aluno, dataSource);
    this.dietaNutricional = this.createHasManyRepositoryFactoryFor('dietaNutricional', dietaNutricionalRepositoryGetter,);
    this.registerInclusionResolver('dietaNutricional', this.dietaNutricional.inclusionResolver);
    this.avaliacoesFisicas = this.createHasManyRepositoryFactoryFor('avaliacoesFisicas', avaliacaoFisicaRepositoryGetter,);
    this.registerInclusionResolver('avaliacoesFisicas', this.avaliacoesFisicas.inclusionResolver);
    this.treinos = this.createHasManyRepositoryFactoryFor('treinos', treinoRepositoryGetter,);
    this.registerInclusionResolver('treinos', this.treinos.inclusionResolver);
    this.pacote = this.createBelongsToAccessorFor('pacote', pacoteRepositoryGetter,);
    this.registerInclusionResolver('pacote', this.pacote.inclusionResolver);
  }
}
