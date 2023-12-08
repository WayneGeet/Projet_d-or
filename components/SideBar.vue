<template>
    <ul class="flex flex-col justify-start gap-[0.4rem] mt-5 w-[15%] ">
      <li v-for="(item, index) in sidebarItems" :key="index" @click="setActive(index)" :class="{active: activeClass === index + 1}"
       class=" hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-black rounded-e-[0.5rem] mr-[0.3rem]">
        <span class="">
          <component :is="item.iconComponent"/>
        </span>
        <NuxtLink :to="item.link">{{ item.text }}</NuxtLink>
      </li>
    </ul>
  </template>
  
  <script setup>
    const activeClass = ref(1)
   
    const setActive = (i) => {
      activeClass.value = i + 1
    }
  
        const sidebarItems =ref ([
          {
            iconComponent: 'IconesBuilding', // The component name for the building icon
            link: '/projects/',
            text: 'projects',
          },
          {
            iconComponent: 'IconesCategories', // The component name for the categories icon
            link: '#',
            text: 'categories',
          },
          {
            iconComponent: 'IconesUsers', // The component name for the users icon
            link: '#',
            text: 'users',
          },
          {
            iconComponent: 'IconesGis', // The component name for the GIS icon
            link: '#',
            text: 'gis',
          },
          {
            iconComponent: 'IconesCall', // The component name for the call icon
            link: '#',
            text: 'reach us',
          },
          {
            iconComponent: 'IconesBuilding', // The component name for the call icon
            link: '/map-view/',
            text: 'view in map',
          },
        ])
        // return{setActive, activeClass}
  </script>

  <style scoped>
  .active {
    border-left: 6px solid rgb(78, 148, 253);
    background-color:rgb(229, 240, 250);
    color:blue;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    margin-right:0.3rem;
  }
  </style>