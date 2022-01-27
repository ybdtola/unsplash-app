<template>
  <div class="searchContainer">
    <div v-if="searchField && !error">
        <div class="searchForm">
          <span class="search" style="font-size: 12px; color:#A2AAB7; 
          padding-left: 10px"><font-awesome-icon icon="search" /></span>
          <input type="search" placeholder="Search for photo" v-model="searchQuery" @keyup.enter="searchText">
        </div>
    </div>
    <div v-else-if="isSearching">
      <div class="searchFound" v-if="!error">
        <p>Searching for <span>"{{searchQuery}}"</span></p>
      </div>
  </div>
    <div v-else>
      <div class="searchFound" v-if="!error">
        <p>Search Results for <span>"{{searchQuery}}"</span></p>
      </div>
  </div>
  </div>
  <div class="container">
    <div v-if="error">
      <Errorpage />
    </div>
    <div v-else-if="isLoading">
       <template class="grid">
      <Skeleton :photo="photo" v-for="photo in 8" :key="photo"/>
      </template>
    </div>
    <div v-else>
      <template class="grid">
        <Gallery v-for="(photo, index) in state.img" :key="photo.id" 
        :photo="photo" @open-modal="openModal($event)" :isLoaded="!isLoading" :isVisible="isOverlay" 
        />
      </template>
    </div>
  </div>
  

  <div v-if="isModalOpen">
    <Modal :photo="state.photo" @close="closeModal" />
  </div>
</template>

<script>

import { onMounted, reactive, ref, computed } from 'vue'
import axios from '@/plugins/axios'
import Modal from '@/components/Modal'
import Gallery from '@/components/Gallery'
import Skeleton from '@/components/Skeleton'
import Errorpage from '@/components/Errorpage'


export default {
  components: { Modal, Gallery, Skeleton, Errorpage },
  setup() {
    const searchQuery = ref('')
    const searchField = ref(true)
    const isLoading = ref(false)
    const isOverlay = ref(false)
    const isSearching = ref(false)
    const error = ref(false)
    const isModalOpen = ref(false)
    const perPage = ref(8)
    const state = reactive({
      img: '',
      // img: ''
      photo: null,
      african: 'african'
    });
    onMounted(async () => {
      isLoading.value = true;
      await axios.get(`/search/photos?query=${state.african}&client_id=${process.env.VUE_APP_API_KEY}&page=1&per_page=${perPage.value}`).then(response => {

      const {results} = response.data;
      state.img = results;
      // isLoading.value = false;
      setTimeout(() => {
        isOverlay.value = true
      }, 2000);
      })
      .catch(e => {
         error.value = true;
      })
      .finally(() =>  isLoading.value = false)
    });


    const openModal = (snap) => {
      isModalOpen.value = true;

      state.photo = snap;
    }

    const closeModal = () => {
      isModalOpen.value = false;
    }

     const searchText = async (e) => {
       isSearching.value = true;
       searchField.value = false;
       isLoading.value = true;
      const {data}  = await axios.get(`/search/photos?query=${searchQuery.value}&client_id=${process.env.VUE_APP_API_KEY}&page=1&per_page=${perPage.value}`);
       const {results} = data;
       state.img = results;
      searchField.value = false
      convertFirstLetter()
      isLoading.value = false;
      isSearching.value = false;
    }

    const convertFirstLetter = () => {
      const searchConverter = searchQuery.value.charAt(0).toUpperCase() + searchQuery.value.slice(1);
      searchQuery.value = searchConverter
    }
    return {state, isModalOpen, isLoading, openModal, closeModal, searchQuery, searchText, searchField, convertFirstLetter, error, isSearching, isOverlay, perPage}
  }
}
</script>


<style lang="scss" scoped>

$search-result-text: 1.5rem;
$absolute: absolute;
$relative: relative;
$auto: auto;

@mixin transform($prop){
  -webkit-transform: $prop;
  -ms-transform: $prop;
  transform: $prop;
}
/* end of scss declarations*/

.searchContainer{
  padding: var(--search-padding-yA) var(--search-padding-xA);
  background-color:var(--nav-bg-color);
  position: $relative;
}
.searchContainer{
  .searchFound{
    max-width: var(--search-result-mxw);
    margin: var(--base-margin-yA) var(--base-margin-xA);
    text-align: left;
    background-color: var(--nav-bg-color);
    position: $relative;
    color: var(--midnightblue);
  }
  p {
    font-family: "Gordita-Medium";
    font-size: $search-result-text;
    // font-weight: bold;

  }
  span{
    color: var(--sgilightblue);
  }
}
.searchForm{
    position: $relative;
    max-width: var(--search-form-mxw);
    margin: var(--base-margin-yA) var(--base-margin-xA);
    height: $auto;
    display: var(--use-flex);
    align-items: var(--row-pos);
}
span.search{
    position: $absolute;
    top: 50%;
    @include transform(translateY(-50%));
    left: var(--search-icon-pos);
}
input[type='search']{
    border: none;
    outline: none;
    // max-width: 850px;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    padding: var(--search-field-padding);
    padding-left: var(--search-field-padding-left);
    box-shadow: var(--search-bx-shadow) var(--sbx-color);
}
  .container{
    position: relative;
    margin-top: var(--background-overlap);
    min-height: var(--min-height);
    padding-bottom: var(--container-pb);
}
  .grid{
    margin: var(--base-margin-yA) var(--base-margin-xA);
    max-width: var(--grid-max-width);
    display: var(--use-grid);
    grid-gap: var(--gap);
    grid-template-columns: var(--masonry);
    grid-template-rows: var(--gtr) var(--grid-max) var(--gtr);
    grid-auto-flow: var(--reflow);
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-family:Buckin-Medium;
  font-size: 15px
}
::-moz-placeholder { /* Firefox 19+ */
  font-family: Buckin-Medium;
  font-size: 15px
}


@media screen and (max-width: 768px){
  .grid{
    padding-left: 50px;
    padding-right: 50px;
  }
}
</style>