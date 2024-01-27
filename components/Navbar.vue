<template>
    <header class="flex bg-blue-100 items-center justify-around">
        <div @click="navigateTo('/projects/')">
            <img class="w-20 h-20 object-contain" src="~/assets/images/logo.jpg" alt="logo">
        </div>
        <section class="flex items-center gap-6">
            <div>
                <div class="relative min-w-[12rem] transition-all duration-500">
                    <div @click="showDD = !showDD" class="bg-slate-100 gap-5 flex justify-between items-center px-4 rounded-md py-2">
                        <span class="text-slate-600 text-sm whitespace-nowrap font-semibold">{{type}}</span>
                        <div class=" transition-all duration-300 ">
                            <div v-if="showDD===false"><IconesDropDown/></div>
                            <div v-else-if="showDD===true"><IconesDropUp/></div>
                        </div>
                    </div>

                    <menu :class="{'hidden':showDD}" class="max-h-[45vh] mt-2 overflow-auto transition-all duration-700 absolute left-0 top-full w-full bg-slate-100 rounded-md px-2 py-2
                    flex flex-col gap-2">
                        <div @click="selectedType(item)" :class="{'bg-slate-300 text-gray-600 font-medium':type===item}" class="text-gray-500 cursor-pointer hover:bg-slate-200 rounded-md p-[4px] text-sm z-20" v-for="item in items" :key="item">
                            <li class="">{{ item }}</li>
                        </div>
                    </menu>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <input class="px-3 py-2 w-[17rem] relative text-sm bg-slate-100 text-slate-500 rounded-md
                border-none outline-none" type="text" name="search" id="search"
                placeholder="search location, title, budget etc.."
                v-model="search_value" >
                <div @click="search()" class="w-6 h-6 p-4 relative -top-full cursor-pointer bg-[#228cdb] transition-colors duration-400 hover:bg-sky-600 rounded-md text-white flex items-center justify-center">
                    <div class=""><IconesSearch/></div>
                </div>
            </div>
        </section>
        <div class="bg-[#228cdb] text-white hover:bg-sky-700 transition-colors duration-400 rounded-md px-3 py-2 text-sm text-center cursor-pointer left-16 relative" @click="navigateTo('/projects/create')">
            <h2>+ Post your project</h2>
        </div>

        <section class="relative w-[10rem] left-5">
            <div @mouseenter="showProf = false" @click="showProf = !showProf" class="relative left-[50%] cursor-pointer rounded-full border-4 border-white w-8 h-8">
                <img src="" alt="">
            </div>
            <div :class="{'hidden':showProf}" class="absolute top-10 shadow-gray-400 shadow-md rounded-md py-2 w-full bg-white bg-opacity-10 backdrop-blur-sm">
                <menu>
                    <div @click="profileNav(i)" class="text-sm hover:bg-slate-100 cursor-pointer py-[4px] px-3 hover:text-blue-400 hover:font-medium rounded-sm" v-for="i in values" :key="i">
                        <li>{{ i }}</li>
                    </div>
                </menu>
            </div>
        </section>
        
        
    </header>

</template>

<script setup>
import {useAuth} from "~/store/auth.js"
import {useProjects} from "~/store/project"
import { storeToRefs } from "pinia";

const AuthStore = useAuth()
const ProjectStore = useProjects()
AuthStore.$subscribe((event)=> console.log("watching authstore"))
const {access} = storeToRefs(AuthStore)
const {projects} = storeToRefs(ProjectStore)



// <---------------states------------------>
const showDD = ref(true)
const type = ref('Project Type')
const items = ref(['Food Security','Water and Sanitization','Transport','Urbanization','Education', 'show all'])
const search_value = ref("")
// user profile
const values = ref(['profile', 'post a project', 'view map', 'logout'])
const showProf = ref(true)
const profileData = await ProjectStore.getProfile()
const getName = profileData?.value
// <--------------methods------------------>
const search = async () => {
    ProjectStore.filterValue = search_value.value
}

const selectedType = (item) => {
    type.value = item
}

const profileNav = (location) => {
    switch(location){
        case 'profile':
            navigateTo(`/accounts/profile/${getName.first_name}_${getName.last_name[0]}/`)
            break;
        case 'post a project':
            navigateTo("/projects/create/")
            break;
        case 'view map':
            navigateTo('/map-view')
            break;
        case 'logout':
            handleLogout()
            break;
    }
}

// watch(() => user, () => {
//     console.log(user.value, "user has changed do something!")
// } )

const handleLogout = () => {
    AuthStore.unAuthenticate()
    navigateTo("/accounts/login/")
}


</script>

<style scoped>
ul {
    margin:0;
    padding:0;
    list-style:none;
}
nav {
    width:100%;
    box-shadow:0 0 10px rgb(0 0 0 / 8%);
}

</style>