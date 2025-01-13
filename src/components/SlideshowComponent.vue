<script lang="ts">
import { defineComponent } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  name: 'SlideshowComponent',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    previousPage() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.$props.images.length - 1
      } else {
        this.currentIndex--
      }
    },
    nextPage() {
      if (this.currentIndex >= this.$props.images.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
  },
  created() {
    this.currentIndex = Math.floor(Math.random() * this.$props.images.length)
  },
  props: {
    images: {
      type: Object,
      required: true,
    },
  },
})
</script>

<template>
  <div class="flex flex-row items-center justify-center">
    <button
      aria-label="Previous image"
      class="relative z-10 h-full p-3 duration-500 bg-gray-800 rounded-lg opacity-50 hover:opacity-100 left-10"
      @click="previousPage"
    >
      <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
    </button>

    <div
      class="relative flex flex-col items-center justify-center w-[75vw] h-[65vw] lg:w-[45vw] lg:h-[35vw]"
    >
      <img
        class="object-cover w-full h-full rounded-lg shadow-xl shadow-black"
        :src="$props.images[currentIndex]['image_url']"
        height="auto"
        :alt="$props.images[currentIndex]['forum_url']"
      />
      <a
        class="absolute bottom-0 z-10 w-full py-2 text-sm italic font-light text-center text-yellow-500 underline duration-500 opacity-75 hover:text-yellow-600 dark:hover:text-yellow-400 transition-color hover:opacity-100 bg-black/50 gray-700"
        :href="images[currentIndex]['forum_url']"
        >{{ $props.images[currentIndex]['forum_url'] }}</a
      >
    </div>

    <button
      aria-label="Next image"
      class="relative z-10 p-3 duration-500 bg-gray-800 rounded-lg opacity-50 hover:opacity-100 right-10"
      @click="nextPage"
    >
      <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
    </button>
  </div>
</template>
