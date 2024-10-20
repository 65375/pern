import { DataSource, In, Repository } from 'typeorm'
import TeamEntity from '../entities/team'

class TeamRepository implements TeamRepository {
    private repository: Repository<TeamEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TeamEntity)
    }

    async getAll(): Promise<TeamEntity[]> {
        return this.repository.find()
    }

    async getById(id: number): Promise<TeamEntity | undefined> {
        const teams = await this.repository.findOneBy({ id })
        return teams || undefined
    }

    async getBy(ids: number[]): Promise<TeamEntity[] | undefined> {
        const team = await this.repository.findBy({
            id: In(ids)
        })
        return team || undefined;
    }

    async create(team: Omit<TeamEntity, 'id'>): Promise<TeamEntity> {
        const newTeam = this.repository.create(team)
        return this.repository.save(newTeam)
    }

    async update(id: number, team: Partial<Omit<TeamEntity, 'id'>>): Promise<TeamEntity | undefined> {
        const tournamenToUpdate = await this.getById(id)

        if (!tournamenToUpdate) {
            return undefined
        }
        return this.repository.merge(tournamenToUpdate, team)
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id)
        return result?.affected ? result.affected > 0 : false
    }
}

export default TeamRepository