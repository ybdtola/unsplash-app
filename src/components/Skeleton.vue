<template>
    <li>
        <img  alt="" />
          <div class="overlay"></div>
            <div class="caption">
              <p>{{}} {{}}</p>
              <p>{{}}</p>
          </div>
    </li>
</template>
<script>
import {toRefs} from 'vue';
export default{
    setup(props){
        const {photo} = toRefs(props)

        return {photo}
    }
}

</script>
<style lang="scss" scoped>

$grid-height: 150px;

     li{
      list-style: none;
      margin: 0;
      cursor: zoom-in;
      position: relative;
      pointer-events: none;
      user-select: none;
  
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
    background-color: #eee;
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
    // background-blend-mode: lighten;
    background-color: #e6e6e6;
    border-radius: 5px;
    animation: pulsep 1s infinite;
    /* z-index: 1; */
  }

  .caption{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 30px;

   & p:nth-child(1){
    // font-size: 14px;
    // color: white;
     height: 16px;
    width: 150px;
    background-color: #f5f5f5;
    animation: pulse 1s infinite;
  }
   & p:nth-child(2){
    // font-size: 12px;
    // // color: #d6d3d3;
    height: 16px;
    width: 100px;
    margin-top: 5px;
    background-color: #f5f5f5;
    animation: pulse 1s infinite;
  }
  @keyframes pulse{
      0%{background-color: #e6e6e6;}
      50%{background-color: #e5e5e5;}
      100%{background-color: #e6e6e6;}
  }
  @keyframes pulsep{
      0%{background-color: #f5f5f5;}
      50%{background-color: #f6f6f6;}
      100%{background-color: #f5f5f5;}
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