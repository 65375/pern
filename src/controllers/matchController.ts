import { Request, Response } from "express"
import MatchRepository from "../repositories/matchRepository"
import { appDataSource } from "../data-source"
import TournamentRepository from "../repositories/tournamentRepository"
import UserRepository from "../repositories/userRepository"
import Match from "../entities/match"
import TeamRepository from "../repositories/teamRepository"
import { error } from "console"

export class MatchController {
    private matchRepository: MatchRepository

    constructor() {
        this.matchRepository = new MatchRepository(appDataSource)
    }

    update = async (req: Request, res: Response) => {
        const {matchId, userId} = req.body
        const matchRepository: MatchRepository = new MatchRepository(appDataSource)
        const userRepository: UserRepository = new UserRepository(appDataSource)
        const match = await matchRepository.getById(matchId)
        if(!match) {
            res.status(404).json({message: "Match not found"})
        }
        const winnerUser = await userRepository.getById(userId)
        if(!winnerUser) {
            res.status(404).json({message: "User not found"})
        }

        match!.winnerUser = winnerUser
        const result = await matchRepository.save(match!)
        if(result)
            res.status(200).json({message: "Match updated"})
        else
            throw error
    }

    create = async (req: Request, res: Response) => {
        const tournamentRepository: TournamentRepository = new TournamentRepository(appDataSource)        
        const userRepository: UserRepository = new UserRepository(appDataSource)
        const teamRepository: TeamRepository = new TeamRepository(appDataSource)

        const tournamentId = req.body.tournament
        const usersIds = req.body.users
        const teamsIds = req.body.teams
        const date = req.body.date

        const tournament = await tournamentRepository.getById(tournamentId)
        if(!tournament) {
            res.status(404).json({message: "Tournament not found!"})
        }

        const users = await userRepository.getBy(usersIds)
        if(users && users.length !== 2) {
            res.status(404).json({message: "Incorret User count"})
        }

        const teams = await teamRepository.getBy(teamsIds)
        if(teams && teams.length !== 2) {
            res.status(404).json({message: "Incorret Team count"})
        }

        const match = new Match()
        match.date = date
        match.users = users
        match.teams = teamsIds
        match.tournament = tournament

        const newMatch = this.matchRepository.create(match)
        res.status(201).json(newMatch)
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const matches = await this.matchRepository.getAll()
        res.status(200).json(matches)
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        const matches = await this.matchRepository.getById(parseInt(req.params.id))
        if (!matches) {
            res.status(404).send('Match not found')
        } else {
            res.status(200).json(matches)
        }
    }
  
}