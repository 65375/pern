import { DataSource, Repository } from 'typeorm'
import TournamentEntity from '../entities/tournament'

class TournamentRepository implements TournamentRepository {
    private repository: Repository<TournamentEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TournamentEntity)
    }

    async getAll(): Promise<TournamentEntity[]> {
        return this.repository.find()
    }

    async getById(id: number): Promise<TournamentEntity | undefined> {
        const tournament = await this.repository.findOneBy({ id })
        return tournament || undefined
    }

    async create(tournament: Omit<TournamentEntity, 'id'>): Promise<TournamentEntity> {
        const newTournament = this.repository.create(tournament)
        return this.repository.save(newTournament)
    }

    async update(id: number, tournament: Partial<Omit<TournamentEntity, 'id'>>): Promise<TournamentEntity | undefined> {
        const tournamenToUpdate = await this.getById(id)

        if (!tournamenToUpdate) {
            return undefined
        }
        return this.repository.merge(tournamenToUpdate, tournament)
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result?.affected ? result.affected > 0 : false
    }
}

export default TournamentRepository