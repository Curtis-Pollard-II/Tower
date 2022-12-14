import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerEventsService {
    async editTowerEvent(id, eventData, userId) {
      const event = await this.getById(id)
      if(event.creatorId != userId){
        throw new Forbidden('You can not Remove that silly')
      }
      if(event.isCanceled != false){
        throw new BadRequest('Event Cancelled....Sorry')
      }
      event.name = eventData.name || event.name
      event.description = eventData.description  || event.description
      event.coverImg = eventData.coverImg  || event.coverImg
      event.location = eventData.location  || event.location
      event.capacity = eventData.capacity  || event.capacity
      event.startDate = eventData.startDate  || event.startDate
      // event.isCanceled = event.isCanceled  || event.isCanceled
      event.type = event.type || event.type

      event.save()
      return eventData
    }

    async getAll() {
      const events = await dbContext.TowerEvents.find().populate('creator', 'name picture')
      return events
    }

    async getById(id) {
        const event = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        if(!event){
          throw new BadRequest('no event by that id')
        }
        return event
      }

    async create(body) {
        const event = await dbContext.TowerEvents.create(body)
        await event.populate('creator', 'name picture')  
        return event
    }

    async archive(eventId, userId){
      const event = await this.getById(eventId)
      if(event.creatorId != userId){
        throw new Forbidden("You don't have permission to delete that")
      }
      // event.remove()
      // NOTE soft delete
      event.isCanceled = !event.isCanceled
      await event.save()
      return `event ${event.name} was archived`
    }




}

export const towerEventsService = new TowerEventsService()