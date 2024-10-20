import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => User, user => user.teams)
    @JoinColumn()
    users: User[]

    constructor(id: number, name: string, users: User[]) {
        this.id = id
        this.name = name
        this.users = users
    }
}

export default Team