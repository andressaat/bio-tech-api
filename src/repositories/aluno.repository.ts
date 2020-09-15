import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Aluno, AlunoRelations, Pacote} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PacoteRepository} from './pacote.repository';

export class AlunoRepository extends DefaultCrudRepository<
  Aluno,
  typeof Aluno.prototype.id,
  AlunoRelations
> {

  public readonly pacote: BelongsToAccessor<Pacote, typeof Aluno.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PacoteRepository') protected pacoteRepositoryGetter: Getter<PacoteRepository>,
  ) {
    super(Aluno, dataSource);
    this.pacote = this.createBelongsToAccessorFor('pacote', pacoteRepositoryGetter,);
    this.registerInclusionResolver('pacote', this.pacote.inclusionResolver);
  }
}
