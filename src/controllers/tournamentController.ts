import { Request, Response } from "express"
import { appDataSource } from "../data-source"
import TournamentRepository from "../repositories/tournamentRepository"

export class TournamentController {
  private tournamentRepository: TournamentRepository

  constructor() {
      this.tournamentRepository = new TournamentRepository(appDataSource)
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const users = await this.tournamentRepository.getAll()
      res.status(200).json(users)
  }

  getById = async (req: Request, res: Response): Promise<void> => {
      const user = await this.tournamentRepository.getById(parseInt(req.params.id))
      if (!user) {
          res.status(404).send('Tournament not found')
      } else {
          res.status(200).json(user)
      }
  }

  create = async (req: Request, res: Response): Promise<void> => {
      const newUser = await this.tournamentRepository.create(req.body)
      res.status(201).json({message: "Tournament added"})
  }

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedUser = await this.tournamentRepository.update(parseInt(req.params.id), req.body)
      if (!updatedUser) {
          res.status(404).send('Tournament not found')
      } else {
          res.status(200).json(updatedUser)
      }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.tournamentRepository.delete(parseInt(req.params.id))
      if (!success) {
          res.status(404).send('Tournament not found')
      } else {
          res.status(204).send()
      }
  }
}