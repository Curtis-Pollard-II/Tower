<template>
<div class="row">
    <div class="col-12">
        <p>{{comment.body}}</p>
        <img :src="comment.creator.picture" alt="">
    </div>
</div>

</template>



<script>
export default {
    props: {comment: {type:Object, required: true} },
setup() {
  return {
    
  };
},
};
</script>



<style> 
</style>