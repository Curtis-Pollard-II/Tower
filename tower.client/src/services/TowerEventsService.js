import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import { api } from './AxiosService';

class TowerEventsService{
    async getAll(){
        const res = await api.get('api/events')
        logger.log('got events from the service', res.data)
        AppState.towerEvent = res.data
    }


}

export const towerEventsService = new TowerEventsService()