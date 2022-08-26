<template>
<form @submit.prevent="handleSubmit">

    <div class="form-group">
        <label for="body"> <b class="fs-5">Comment on this Event</b> </label>
        <input  v-model="editable.body" type="text" class="form-control" id="body" placeholder="whatcha got to say?">
    </div>

    <button type="submit" class="btn btn-secondary">Submit</button>
</form>
</template>



<script>
import { ref } from '@vue/reactivity';
import { logger } from '../utils/Logger';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
export default {
setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async handleSubmit() {
        try {
          logger.log('creating COMMENT from component form', editable.value)
          editable.value.eventId = route.params.eventId
          await commentsService.createComment(editable.value)
          editable.value = {}
          Pop.toast('Comment Posted!')
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