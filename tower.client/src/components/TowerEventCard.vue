<template>
  <router-link :to="{ name: 'TowerEventDetails', params: {eventId: towerEvent.id} }">

<div class="p-2">
    <div class="bg-primary">
        <img class="img-fluid" :src="towerEvent.coverImg" alt="">
        <h2 class="bg-danger p-1 text-white text-center">{{towerEvent.name}}</h2>
            <p class="fs-4 p-1 text-center">Tickets Available: <b>{{towerEvent.capacity}}</b></p>
            <hr>
            <i class="text-success text-end p-2">{{towerEvent.startDate}} ----- {{towerEvent.location}}</i>
            <i class="text-success p-2"></i>
            <p class="p-2" v-if="towerEvent.isCanceled">❌Event Canceled❌</p>
            <p class="p-2" v-else>YeeeeeeHaaaaaa!</p>
            <p class="p-2">{{towerEvent.description}}</p>

    </div>
</div>
  </router-link>
</template>


<script>
export default {
    props: { towerEvent: { type: Object, required: true}},

setup() {
  return {

  };
},
};
</script>


<style> 

</style>