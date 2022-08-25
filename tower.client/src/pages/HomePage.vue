<template>

<div class="row bg-primary py-1 px-5 text-danger">
      <div class="col-12">
        <h1 class="text-center">Event Types</h1>
      </div>
      <div class=" text-center fs-5 col-12 text-dark mdi mdi-filter-variant">
        filter <i class="mdi mdi-filter-variant"></i>
      </div>
      <div class="col-2 btn btn-outline-light rounded-pill text-dark fs-4" @click="filterTerm = ''">All Events</div>
      <div class="col-2 btn btn-outline-light rounded-pill text-dark fs-4" @click="filterTerm = 'concert'">Concert</div>
      <div class="col-2 btn btn-outline-light rounded-pill text-dark fs-4" @click="filterTerm = 'convention'">Convention</div>
      <div class="col-2 btn btn-outline-light rounded-pill text-dark fs-4" @click="filterTerm = 'digital'">Digital</div>
      <div class="col-2 btn btn-outline-light rounded-pill text-dark fs-4" @click="filterTerm = 'sport'">Sport</div>
    </div>

<div class="row">
    <div class="col-6 selectable" v-for="e in towerEvents" :key='e.id'>
      <TowerEventCard :towerEvent="e"/>
    </div>
</div>

</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { router } from '../router.js';

export default {
  name: 'Home',
  props: { towerEvent: {type: Object, required: true}},
  setup(){
    const filterTerm = ref('')
    async function getTowerEvents(){
      try {
        await towerEventsService.getAll();
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    onMounted(()=>{
      getTowerEvents();
    });

    return {
      goTo(){
        router.push({name: 'TowerEventDetails', params: { eventId: props.towerEvent.id}})
      },
      filterTerm,
      towerEvents: computed(() => AppState.towerEvent.filter(e => filterTerm.value ? e.type == filterTerm.value: true)),

    }
  }
}
</script>

<style scoped lang="scss">

</style>
