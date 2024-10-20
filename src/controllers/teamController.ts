import { Request, Response } from "express"
import { appDataSource } from "../data-source"
import TeamRepository from "../repositories/teamRepository"

export class TeamController {
  private teamRepository: TeamRepository

  constructor() {
      this.teamRepository = new TeamRepository(appDataSource)
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const users = await this.teamRepository.getAll()
      res.status(200).json(users)
  }

  getById = async (req: Request, res: Response): Promise<void> => {
      const user = await this.teamRepository.getById(parseInt(req.params.id))
      if (!user) {
          res.status(404).send('Team not found')
      } else {
          res.status(200).json(user)
      }
  }

  create = async (req: Request, res: Response): Promise<void> => {
      const newUser = await this.teamRepository.create(req.body)
      res.status(201).json({message: "Team added"})
  }

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedUser = await this.teamRepository.update(parseInt(req.params.id), req.body)
      if (!updatedUser) {
          res.status(404).send('Team not found')
      } else {
          res.status(200).json(updatedUser)
      }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.teamRepository.delete(parseInt(req.params.id))
      if (!success) {
          res.status(404).send('Team not found')
      } else {
          res.status(204).send()
      }
  }
}