<template>
<div class="row rounded">
    <div>
        <p> {{towerEvent.eventId}}</p>
    </div>
</div>

</template>

<script>
export default {
    props: { towerEvent: { type: Object, required: true} },
setup() {
  return {

  };
},
};
</script>


<style> 
</style>