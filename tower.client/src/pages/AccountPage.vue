<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="row p-1 fs-4"><b>My Events</b>
    <hr>
      
        <div v-for="e in myTicketEvents"  class="col-2">
          <img class="img-fluid rounded elevation-2" :src="e.event.coverImg" >
        </div>
      
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
export default {
  name: 'Account',
  setup() {

    async function getTicketEvents() {
      try {
        await ticketsService.getEventTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    
    onMounted(() => {
      getTicketEvents()
      })
    
    return {
      account: computed(() => AppState.account),
      myTicketEvents: computed(() => AppState.ticketEvents)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
