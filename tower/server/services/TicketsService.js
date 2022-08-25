import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketsService{
    async remove(eventId, userId) {
      const deleteTicket = await dbContext.Tickets.findById(eventId)
      if(!deleteTicket) {
        throw new BadRequest('no ticket at that Id')
      }
      if(deleteTicket.accountId !=userId){
        throw new Forbidden('You can not Remove that silly')
      }
      await deleteTicket.remove()
      const event = await dbContext.TowerEvents.findById(deleteTicket.eventId)
      // @ts-ignore
      event.capacity += 1
      // @ts-ignore
      await event.save()
      return 'ticket erased'
    }
    async create(body) {
        // go get the event by id kinda like the line below
        const event = await dbContext.TowerEvents.findById(body.eventId)
        // @ts-ignore
        if (event.capacity == 0){
        throw new BadRequest("Event is full.")}
        const ticket = await dbContext.Tickets.create(body)
        // @ts-ignore
        event.capacity -= 1
        await ticket.populate('event')
        await ticket.populate('profile', 'name picture')
        // find a way to SAVE the event once capacity has been updated.
        // @ts-ignore
        event.save()
        return ticket
    }

    async getByEventId(eventId){
        let ticket = await dbContext.Tickets.find({eventId: eventId}).populate('profile', 'name picture')
        return ticket
    }

    async getByAccountId(accountId){
        const ticket = await dbContext.Tickets.find({accountId}).populate('event')
        return ticket
    }

}

export const ticketsService = new TicketsService()