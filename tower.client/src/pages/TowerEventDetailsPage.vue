<template>
  <div><button v-if="towerEvent.creatorId == account.id" class="btn btn-pill btn-danger" @click="deleteEvent">Delete Event</button></div>
  <div class="container">
    <div class="row p-1 ">
        <h1 class="col-md-4 text-start">{{ towerEvent.name }}</h1>
        <div class="col-md-4">
          <button v-if="!reserved && !towerEvent.isCanceled"  class="btn mb-1 btn-pill btn-danger fs-4" @click="reserve">Reserve a Ticket</button>
          <button v-else-if="!towerEvent.isCanceled" class="btn mb-1 btn-pill btn-success fs-4" @click="unReserve">Cancel Reservation</button>
        </div>
        <p class="col-md-4 fs-4 p-1 text-end">Tickets Available: <b>{{towerEvent.capacity}}</b></p>
      <div class="col-md-4">
        <img class="img-fluid" :src="towerEvent.coverImg" alt="" />
      
      </div>

      <div class="col-md-8 bg-primary">
        <div class="p-1">
          <div class="row">
            <i class="col-md-6 text-secondary text-start fs-6 p-2">{{ new Date(towerEvent.createdAt).toLocaleDateString("en-Us", { month: "short", day: "numeric", }) }}</i>
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
      <div class="text-end fs-7 p-1"><i class="text-danger fs-7">Event Creator ⇨ </i> {{towerEvent.creator?.name}} </div>
    </div>
  
    <div class="card">
      <!--                           :key="t.index"  || :key="t.id" -->
      <div v-for="t in ticketProfiles"  class="col-2">
        <img class="img-fluid rounded elevation-2" :src="t.profile.picture" :title="t.profile.name">
      </div>
    </div>

  <div class="container p-3">
    <comment-form/>
  </div>

  <div class="container p-5">
    <div class="row p-3">
      <comment-card :comment="c" v-for="(c, i) in comments" :key="c.id" />
    </div>
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
import CommentForm from '../components/CommentForm.vue';
import CommentCard from '../components/CommentCard.vue';
import { commentsService } from '../services/CommentsService';
export default {
  components: { CommentForm, CommentCard },
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

    async function getCommentsByEventId(){
      try {
        await commentsService.getComments(route.params.eventId);
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
      getTicketProfiles();
      getCommentsByEventId();
    });
    return {
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.activeTowerEvent),
      comments: computed(() => AppState.comments),
      ticketProfiles: computed(() => AppState.ticketProfiles),
      myTicketEvents: computed(() => AppState.ticketEvents),
      reserved: computed(()=> {
        if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),

      async deleteEvent(){
        try {
          await towerEventsService.removeEvent(route.params.eventId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async reserve(){
        try {
          let newReservation = {
            eventId: AppState.activeTowerEvent.id,
          }
          logger.log('creating reservation spot', newReservation)
          await ticketsService.create(newReservation)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async unReserve(){
        try {
          let ticketToRemove = AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)
          await ticketsService.removeTicket(ticketToRemove.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    };
  },
};
</script>


<style>
</style>