<template>
    <!-- <transition name="fade" appear> -->
    <div class="backdrop" @click.self="closeModal">
    
    <!-- </transition> -->
        <span @click="closeModal"><font-awesome-icon icon="times" /></span>
        <transition name="scale" appear>
        <div class="image-box">
            <img :src="photo.urls.regular" :alt="photo.alt_description" :title="photo.alt_description">
            <div class="image-desc">
                <h3>{{photo.user.first_name}} {{photo.user.last_name}}</h3>
                <p>{{photo.user.location}}</p>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
    // import { reactive, toRefs } from 'vue'
   export default{
    //    setup(props){
    //     const {img} = toRefs(props)
    //    }
    props: [ 'photo', 'activeClass'],
    methods:{
        closeModal(){
            this.$emit('close');
        }
    }
   }

</script>
<style scoped>
    .backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #00000066;
        display: flex;
        align-items: center;
        text-align: center;
        /* visibility: hidden;
        opacity: 0; */
        /* transform: scale(0); */
        /* transition: opacity .5s; */
        cursor: zoom-out;
    }
    /* .fade-enter-active,
    .fade-leave-active{
        transition: opacity 5s
    }
    .fade-enter,
    .fade-leave-to{
        opacity: 0;
    } */
    .scale-enter-active{
        animation: scale 0.5s;

    }
    .scale-leave-active{
        animation: scale 0.5s reverse;
    }
    @keyframes scale{
        0%{transform: scale(0)}
        100%{transform:scale(1)}
    }
    span{
        position: absolute;
        top: 30px;
        right: 50px;
        cursor: pointer;
        z-index: 10;
        color: white;
        padding: 5px;
        transition: all .3s, color .3s .3s;
    }
    span:hover{
        transform: rotate(360deg);
        color: rgb(115, 9, 9);
    }
    .image-box{
        position: relative;
        margin: 0 auto;
        max-width: 900px;
        width: 100%;
        height: 90%;
        /* transition: transform .3s; */
        display: flex;
        justify-content: center;
        z-index: 2;
    }
    /* .backdrop.active image.box{
        transform: scale(1);
    } */
    img{
        width: 100%;
        max-width: 900px;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        cursor: default;
    }
    /* .backdrop.visible{
        visibility: visible;
        outline: none;
        cursor: default;
    } */
    .image-desc{
        position: absolute;
        bottom: 0;
        width: 100%;
        max-width: 900px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        background: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: left;
        padding-left: 35px;
        padding-bottom: 10px;
        margin: 0 auto;
        line-height: 20px;
        font-family: Buckin-Regular;
    }
    .image-desc > h3{
        color: #314974
    }
    .image-desc p{
        color: #707e93;
        font-size: 14px;
        padding-top: 5px;
        font-family: Buckin-Medium;
    }
</style>