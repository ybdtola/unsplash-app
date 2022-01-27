<template>
   <div class="canvas" @click="$emit('open-modal', photo)">
      <img :src="photo.urls.regular" :alt="photo.alt_description" :title="photo.alt_description"/>
        <div class="overlay" :class="{visible: isVisible}" :title="photo.alt_description"></div>
          <div class="caption">
            <p>{{photo.user.first_name}} {{photo.user.last_name}}</p>
            <p>{{photo.user.location}}</p>
        </div>
    </div>
</template>

<script>
    export default {
      props: ['photo', 'isLoaded', 'isVisible']
  }
</script>


<style lang="scss" scoped>

$grid-height: 150px;

  div.canvas{
      margin: 0;
      cursor: zoom-in;
      position: relative;
  
    &:nth-child(2){
      grid-row: 1 /span 2;
      grid-column: 2;
    }
    &:nth-child(4) {
      grid-row: 2/4;
    }
    &:nth-child(6) {
      grid-row: 2/4;
    }
    &:nth-child(5){
      /* grid-row: 1; */
      grid-column: 2;
    }
    &:nth-child(7){
      $grid-height: $grid-height * 2;
      height: $grid-height;
    }
    &:nth-child(8){
      $grid-height: $grid-height * 2;
      height: $grid-height;
      grid-column: span 2;
    }
}
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  /* li:nth-child(2) img{
    grid-row: span 2; 
    grid-column: span 2;
  } */
 

  .overlay{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    // background-blend-mode: lighten;
    background: linear-gradient(transparent 50%, #000000);
    border-radius: 5px;
    /* z-index: 1; */
    transition: opacity 2s ease-out;
  &.visible{
    opacity: 1;
    visibility: visible;
  }
  }

  .caption{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 30px;
    font-family: Buckin-Regular;

   & p:nth-child(1){
     font-family: Buckin-Medium;
     font-size: 16px;
    color: white;
  }
   & p:nth-child(2){
    font-size: 14px;
    color: #d6d3d3;
    padding-top: 2px;
  }
  }

  @media screen and (max-width: 768px){
    li{
      grid-row: auto !important;
      grid-column: auto !important;
      height: auto !important;
    }
  }

</style>