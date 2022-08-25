<template>
        <div class="container border">
            <div class="row p-1">
                <div class="col-12 p-1">
                    <h1>{{towerEvent.name}}</h1>
                </div>
                <div class="col-3">
                    <img class="img-fluid" :src="towerEvent.coverImg" alt="">
                </div>
                
            </div>
        </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
setup() {
    const route = useRoute();
    async function getTowerEventById(){
        try {
          await towerEventsService.getById(route.params.eventId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }

    async function getTicketProfiles(){
        try {
          await ticketsService.getTicketProfilesByEvent(route.params.eventId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
onMounted(() => {
    getTowerEventById();
    getTicketProfiles()
})
  return {
    towerEvent: computed(()=> AppState.activeTowerEvent),
    ticketProfiles: computed(()=> AppState.ticketProfiles)
  };
},
};
</script>


<style> 

</style>