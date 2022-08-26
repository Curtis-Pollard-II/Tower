<template>
<div class=" card bg-primary p-3">
<div class="row ">
    <div class="col-12">
        <p class="fs-5">{{comment.body}}</p>
        <div>
            <img :src="comment.creator" alt="">
       </div>
        <p class="text-end">--{{comment.creator.name}}  <button class="btn btn-sm btn-pill btn-secondary" @click="removeComment">Remove</button></p>
    </div>
</div>
</div>
</template>



<script>
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
    props: {comment: {type:Object, required: true} },
setup(props) {
  return {
    async removeComment(){
        try {
            const yes = await Pop.confirm("Are you sure?");
            if (!yes) {
                return;
            }
          await commentsService.removeComment(props.comment.id)
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