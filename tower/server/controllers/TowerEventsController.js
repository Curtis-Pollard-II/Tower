import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAll)
        .get('/:id', this.getById)
        .get('/:id/tickets', this.getByEventId)
        .get('/:id/comments' this.getComments)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .put('/:id', this.editTowerEvent)
        .delete('/:id', this.archive)
    }

    async getComments(req, res, next)

    async getByEventId (req, res, next){
      //                                                                  maybe eventId
      try {
          const ticketByEventId = await ticketsService.getByEventId(req.params.id)
        return res.send(ticketByEventId)
      } catch (error) {
        next(error)
      }
    }

    async create (req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const event = await towerEventsService.create(req.body)
          return res.send(event)
        } catch (error) {
          next(error)
        }
    }

    async getAll(req, res, next){
      try {
        const events = await towerEventsService.getAll()
        return res.send(events)
      } catch (error) {
        next(error)
      }
    }

    async getById(req, res, next){
      try {
        const event = await towerEventsService.getById(req.params.id)
        return res.send(event)
      } catch (error) {
        next(error)
      }
    }

    async editTowerEvent(req, res, next){
      try {
        // data from the client(possible from a form)
        let eventData = req.body 
        let event = await towerEventsService.editTowerEvent(req.params.id, eventData)
        res.send(event) 
      } catch (error) {
        next(error)
      }
    }

    async archive(req,res,next){
      try {
        const message = await towerEventsService.archive(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }








}

