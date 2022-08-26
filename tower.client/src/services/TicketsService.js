import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

    async create(reserveTicket){
        const res = await api.post('api/tickets', reserveTicket)
        logger.log('created Reservation in service', res.data)
        AppState.ticketProfiles.push(res.data)
    }
    async getTicketProfilesByEvent(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log ('Getting Profiles for events on the Event detail page', res.data)
        AppState.ticketProfiles = res.data
    }

    async removeTicket(ticketId){
        const res = await api.delete('api/tickets/'+ticketId)
        logger.log('removing ticket from the service', res.data)
        AppState.ticketProfiles = AppState.ticketProfiles.filter(t => t.id !=ticketId)
    }

}

export const ticketsService = new TicketsService()