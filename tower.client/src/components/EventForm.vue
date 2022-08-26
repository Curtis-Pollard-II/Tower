<template>
  <div class="form-body">
          <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
            <div class="col-12 fs-1 text-center text-danger"> Create Event</div>
            <div class="col-6 p-1">
              <label for="" class="form-label">Event Name</label>
              <input type="text" v-model="editable.name" class="form-control" name="name" id="name"/>
            </div>
            <div class="col-6 p-1">
              <label for="coverImg" class="form-label">Cover Image</label>
              <input type="url" v-model="editable.coverImg" class="form-control" name="coverImg" id="coverImg" aria-describedby="helpId" placeholder="" />
            </div>
             <div class="col-6 p-1">
              <label for="startDate" class="form-label">Date</label>
              <input type="date" v-model="editable.startDate" class="form-control" name="startDate" id="startDate"/>
            </div>
            <div class="col-6 p-1">
              <label for="location" class="form-label">Event Location</label>
              <input type="text" v-model="editable.location" class="form-control" name="location" id="location"/>
            </div>
            <div class="col-6 p-1">
              <label for="isCanceled" class="form-label">Event Canceled?</label>
                <select type="text" v-model="editable.isCanceled" class="form-control" name="isCanceled" id="isCanceled">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div class="col-6 p-1">
              <label for="type" class="form-label">Event Type</label>
              <select v-model="editable.type" name="type" id="type" class="form-control">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="digital">Digital</option>
                <option value="sport">Sport</option>
              </select>
            </div>
            <div class="col-6 p-1">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="editable.description" class="form-control" name="description" id="description"/>
            </div>
            <div class="col-6 p-1">
              <label for="capacity" class="form-label">Capacity</label>
              <input type="number" v-model="editable.capacity" class="form-control" name="capacity" id="capacity"/>
            </div>
            <div class="col-12 p-1 d-flex justify-content-end">
                <button class="btn btn-secondary">Submit</button>
            </div>
          </form>
        </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          logger.log('creating event from component form', editable.value)
          const tEvent = await towerEventsService.createEvent(editable.value)
          editable.value = {}
          router.push( {name: 'TowerEventDetails', params: {eventId: tEvent.id}} )
          Pop.toast('Event Created!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>
<style>
</style>