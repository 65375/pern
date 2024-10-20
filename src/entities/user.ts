import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Match } from "./match"
import { Team } from "./team"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  email?: string

  @Column()
  password?: number

  @ManyToMany(() => Match, matches => matches.users, { lazy: true })
  matches?: Match[]

  @ManyToMany(() => Team, team => team.users, { lazy: true })
  teams?: Team[]

  /*@BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
  }*/

  constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: number,
    matches?: Match[],
    teams?: Team[]
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.matches = matches
    this.teams = teams
  }
}

export default User