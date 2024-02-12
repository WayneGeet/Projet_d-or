<template>
    <ul class="flex flex-col justify-start mt-5 w-[15%] text-sm">
      <li v-for="(item, index) in sidebarItems" :key="index" @click="setActive(index, item)" :class="{active: activeClass === index + 1}"
       class=" hover:bg-gray-100 cursor-pointer pl-3 flex items-center gap-3 text-black rounded-e-[0.5rem] mr-[0.3rem]">
        <span class="">
          <component :is="item.iconComponent"/>
        </span>
        <div>{{ item.text }}</div>
      </li>
    </ul>
  </template>
  
  <script setup>
  import {setData, getData} from "nuxt-storage/local-storage"
    const activeClass = ref(getData("active-link"))
   
    const setActive = async (i, item) => {
      activeClass.value = i + 1
      setData("active-link", activeClass.value, 9999, "m")
      await navigateTo(item.link)
    }
    onBeforeMount(async () => {
      if(!activeClass.value){
        setData("active-link", 1, 9999, "m")
        activeClass.value = getData("active-link")
        await navigateTo("/projects")
      }
    })  
    const sidebarItems =ref ([
      {
        iconComponent: 'IconesBuilding', // The component name for the building icon
        link: '/projects',
        text: 'projects',
      },
      {
        iconComponent: 'IconesUsers', // The component name for the users icon
        link: '/#',
        text: 'users',
      },
      {
        iconComponent: 'IconesGis', // The component name for the GIS icon
        link: '/#',
        text: 'gis',
      },
      {
        iconComponent: 'IconesCall', // The component name for the call icon
        link: '/#',
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