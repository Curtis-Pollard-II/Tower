<template>
  <div class="container">
    <div class="row p-1">
        <h1 class="col-md-6 text-start">{{ towerEvent.name }}</h1>
        <p class="col-md-6 fs-4 p-1 text-end">Tickets Available: <b>{{towerEvent.capacity}}</b></p>
      <div class="col-md-4">
        <img class="img-fluid" :src="towerEvent.coverImg" alt="" />
      
      </div>

      <div class="col-md-8 bg-primary">
        <div class="p-1">
          <div class="row">
            <i class="col-md-6 text-secondary text-start fs-6 p-2">{{ towerEvent.startDate }}</i>
            <i class="col-md-6 text-secondary text-end fs-5 p-2">{{ towerEvent.location }}</i>
          </div>
          <hr>
          <p class="p-2 text-danger" v-if="towerEvent.isCanceled">❌Event Canceled❌</p>
          <p class="p-2" v-else></p>
        </div>
        <p class="p-2">{{ towerEvent.description }}</p>
      </div>
    </div>
    <div class="row">

    </div>
    <div class="fs-7 p-1"><i class="text-danger fs-7">Event Creator ⇨ </i> {{towerEvent.creator}} </div>
  </div>

  <div class="container p-3">
    <CommentForm />
  </div>

  <div class="container">
    <CommentCard :comment="c" v-for="(c, i) in comments" :key="c.id" />
  </div>

  
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { ticketsService } from '../services/TicketsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js';
export default {
  setup() {
   
    const route = useRoute();
    async function getTowerEventById() {
      try {
        await towerEventsService.getById(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }

    async function getTicketProfiles() {
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
    });
    return {
      towerEvent: computed(() => AppState.activeTowerEvent),
      comments: computed(() => AppState.comments),
      ticketProfiles: computed(() => AppState.ticketProfiles)
    };
  },
};
</script>


<style>
</style>