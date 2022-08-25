import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async getTicketProfilesByEvent(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log ('Getting Profiles for events on the Eventdetail page', res.data)
        AppState.ticketProfiles = res.data
    }

}

export const ticketsService = new TicketsService()