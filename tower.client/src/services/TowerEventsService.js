import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import { api } from './AxiosService';

class TowerEventsService{

    async createEvent(newEvent){
        const res = await api.post('api/events', newEvent)
        logger.log('Creating New Event in Service', res.data)
        AppState.towerEvent.unshift(res.data)
        return res.data


    }
    async getAll(){
        const res = await api.get('api/events')
        logger.log('got events from the service', res.data)
        AppState.towerEvent = res.data
    }

    async getById(id){
        const res = await api.get('api/events/'+id)
        logger.log('getting towerbyId from the service)', res.data)
        AppState.activeTowerEvent = res.data
    }

    async removeEvent(eventId){
        const res = await api.delete('api/events/'+ eventId)
        logger.log('removing event from the service', res.data )
        return res.data
        // AppState.activeTowerEvent = AppState.activeTowerEvent.filter(e => e.id != eventId)
    }

}

export const towerEventsService = new TowerEventsService()