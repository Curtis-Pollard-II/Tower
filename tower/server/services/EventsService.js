import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class EventsService {
    async getAll() {
      const events = await dbContext.Events.find().populate('creator', 'name picture')
      return events
    }

    async getById(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if(!event){
          throw new BadRequest('no event by that id')
        }
        return event
      }

    async create(body) {
        const event = await dbContext.Events.create(body)
        // not sure what to populate here ||  just copying the "albumservice"
        await event.populate('creator', 'name picture')  
        return event
    }




}

export const eventsService = new EventsService()