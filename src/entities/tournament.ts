import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Match } from './match'

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    date?: Date

    @OneToMany(() => Match, match => match.tournament)
    matches: Match[]

    constructor(
        id: number,
        name: string,
        date: Date,
        matches: Match[]
    ) {
        this.id = id
        this.name = name
        this.date = date
        this.matches = matches
    }
}

export default Tournament