<template>
    <div class="bg-slate-50 max-h-screen h-screen relative">
        <form method="POST" enctype="multipart/form-data" @submit.prevent="handleSubmit" class="mx-auto max-w-5xl rounded-lg relative w-full px-20 py-10">
           <section class="grid-custom">
                <article class="">
                    <div class="field">
                        <label for="project_name">Project Name</label>
                        <input type="text" name="project_name" id="project_name" v-model="project_name" required>
                    </div>
                    
                    <div class="field">
                        <label for="budget">Project Budget</label>
                        <input type="text" name="budget" id="budget" v-model="budget" required>
                    </div>
                    
                    <div class="field">
                        <label for="project-type">Project Type</label>
                        <select class="max-h-[10rem] overflow-auto" id="project-type" v-model="selected_type" required>
                            <option disabled value="">Please select one</option>
                            <option>Urban</option>
                            <option>Transport</option>
                            <option>Agricultural</option>
                            <option>Mining</option>
                            <option>Water and Sanitation</option>
                            <option>Disaster Management</option>
                            <option>Public Safety</option>
                            <option>Environment Conservation</option>
                            <option>Smart City</option>
                            <option>Health Care</option>
                        </select>
                    </div>
                </article>

                <article class="">
                    <div class="field">
                    <label for="phase">Project Phase</label>
                    <select id="phase" v-model="phase" required>
                        <option disabled value="">Please select one</option>
                        <option>Initial</option>
                        <option>Planning</option>
                        <option>Execution</option>
                        <option>Closing</option>
                    </select>
                </div>
            

                <div class="field">
                    <input type="file" required @change="handleImageUpload" accept=".jpeg, .jpg, .png" name="" id="">
                </div>
                <div class="field">
                    <label class="flex items-center gap-4" for="locate"><span>
                            <IconesFlag />
                        </span>Select project location</label>
                    <input @focus="handleFocus" required  type="text" name="locate" id="locate" :value="search_text">
                    </div>
                </article>
            </section>
            <div class="field">
                <label for="about">About</label>
                <textarea class="" name="about" id="about" v-model="about" maxlength="300" required></textarea>
            </div>
            <button class="bg-[#228cdb] text-white mt-[2rem] w-1/3 mx-auto block py-2 rounded-[0.3rem] hover:bg-[#51a1dd]" type="submit">Submit</button>
        </form>

        <section v-if="showDialog" class="px-7 py-4 rounded-md absolute max-w-5xl bg-white top-0 z-10 overflow-hidden ">
            <!-- Body -->
            <article class="min-w-6xl gap-10 " :class="{'grid grid-cols-2 gap-4': !showMap }">
                <section class="w-full ">
                    <!-- heading -->
                    <div class="flex items-center mb-5 gap-5">
                        <h3 class="text-xl font-bold mx-auto text-center">Select the location of the project</h3>
                        <span @click="showDialog = false, showMap = false" class="text-2xl flex items-center relative cursor-pointer ">
                            <IconesClose />
                        </span>
                    </div>

                    <article class="w-full gap-4 relative flex items-center mb-[10rem]">
                        <label for="location" class=""><IconesFlag /></label>
                        <span class="relative w-full">
                            <input @focus="isWatching=true" class="w-full" type="text" name="location" id="location" v-model="search_text" placeholder="Where's the project?"/>
                            <span @click="search_text='' " class="p-[4px] rounded-full bg-gray-400 absolute text-white top-1/2 mr-2 cursor-pointer -translate-y-1/2 right-0 text-md"><IconesClose/></span>
                        </span>
                        

                        <!---------------------- list of places ----------------------------->

                        <article v-if="isWatching" class="rounded-md shadow-lg shadow-grey-600 px-1 min-h-[3rem] absolute top-[2.5rem] left-8 flex flex-col gap-1 bg-white w-[90%]">
                            
                            <img v-if="pend " class="w-10 mx-auto" src="~/assets/images/loader_2.gif" alt="loading">
                            <div v-else-if="!pend && places.length" @click="handlePlaceSelect(local)" class="cursor-pointer hover:bg-slate-200" v-for="local in computed_places"
                                :key="`${local.text} ${local.place_name}`">
                                <h4 class="font-semibold text-sm">{{ local.text }}</h4>
                                <p class="place_name text-sm">{{ local.place_name }}</p>
                            </div>
                            <p v-else-if="places.length === 0" class="text-center font-semibold my-auto">Not found</p>
    
                        </article>
                    </article>

                    <article class="w-full flex items-center gap-4 mb-[10rem]">
                        <button class="text-lime-600 text-[1rem]">
                            <IconesHere />
                        </button>
                        <span class="cursor-pointer" @click="showAlert">Use current location</span>
                    </article>
                </section>

                <section class="aspect-video overflow-hidden top-1/2">
                    <!-- <img class="object-cover aspect-video" src="~/assets/images/location.jpg" alt="location" /> -->
                    <MapboxMap
                        map-id="create"
                        style="position: absolute; top: 0; bottom:0;"
                        :options="{
                            style: 'mapbox://styles/wayne-geet/clk9alnap00oh01qy18um4etm',
                            center: [control.lng, control.lat],
                            zoom:control.zoom
                        }"
                    >
                        <MapboxGeolocateControl position="top-left" />
                    </MapboxMap> 
                </section>
            </article>

        </section>

        <section v-if="showDialog" class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60"
            @click="showDialog = false">
        </section>

    </div>
</template>

<script setup>
definePageMeta({
    middleware:"auth",
    layout:"start"
})
import {useProjects} from "~/store/project";
const ProjectStore = useProjects();
// const longitude = ref("")
// const latitude = ref("")
const selected_type = ref("Please select one")
const search_text = ref("")
const showDialog = ref(false)
const budget = ref("")
const project_name = ref("")
const county = ref("")
const about = ref("")
const phase = ref("Please select one")
const handleFocus = () => {
    showDialog.value = true
}
const showMap = ref(false)
const pend = ref(true)
const places = ref(null)
const computed_places = ref(null)
const places_dialog = ref(false)
// watchEffect(() => {
//     if(search_text.value){
//         isWatching.value = true
//     }
//     else isWatching.value = false
// })
const isWatching = ref(false)

watch(search_text, async (newText, oldText) => {
    if(oldText.length < newText.length && isWatching.value){
        const { data, pending } = await useLazyFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text.value}.json?access_token=pk.eyJ1Ijoid2F5bmUtZ2VldCIsImEiOiJjbGtjZWlnOXQwMmRiM2twZG05b2VldmcyIn0.93DilXpZMzPqgn_C7Y7L3w&country=KE`, {
        })
        const places_value = await data.value
        console.log(places_value)
        pend.value = pending.value
        places.value = places_value?.features
        const places_computed = computed(() => {
            return places.value?.filter((place, index) => index <=2)
        })
        computed_places.value = places_computed.value
    }
})

// gis
const control = ref({
    lat:-0.02985849,
    lng:37.0854356,
    zoom:6
})

const showAlert = () => window.alert('sorry, this feature is not functional at this moment')
const mapRef = useMapboxRef('create')
      console.log(mapRef.value)
      

const lnglat = ref(undefined)

const handlePlaceSelect = (location) => {
    console.log(location.place_name)
    county.value = location.place_name
    lnglat.value = location.center
    console.log(lnglat.value)
    isWatching.value = false
    search_text.value = location.place_name
}
// File upload
const selectedImage = ref(null)
const handleImageUpload = (event) => {
    selectedImage.value = event.target.files[0]
}

const handleSubmit = async () => {
    const fd = new FormData()
    fd.append("photo", selectedImage.value)
    fd.append("location", JSON.stringify({ type: "Point", coordinates: [37.024, -0.123] }));
    fd.append("budget", budget.value);
    fd.append("name", project_name.value);
    fd.append("project_type", selected_type.value);
    fd.append("county", county.value)
    fd.append("about", about.value)
    fd.append("phase", phase.value.toLowerCase())

    const {msg} = await ProjectStore.postProject(fd)   
    console.log(msg) 
    navigateTo("/projects/")
}

</script>

<style scoped>
input:not([type="file"]),
select,textarea {
    display: block;
    outline: 1px solid #d1c6ad;
    border: none;
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.3rem 0.5rem;
}
label {
    font-size:0.9rem;
    padding-top:1rem;
    color:#0a0908;
}
.field {
    padding:0.4rem 0;
}
.grid-custom {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(20rem, 1fr));
    gap:5rem;
}
.place_name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* File Field Design */
input[type="file"] {
  position: relative;
}

input[type="file"]::file-selector-button {
  width: 136px;
  color: transparent;
}

/* Faked label styles and icon */
input[type="file"]::before {
  position: absolute;
  pointer-events: none;
  top: 10px;
  left: 16px;
  height: 20px;
  width: 20px;
  content: "";
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230964B0'%3E%3Cpath d='M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z'/%3E%3C/svg%3E");
}

input[type="file"]::after {
  position: absolute;
  pointer-events: none;
  top: 11px;
  left: 40px;
  color: #228cdb;
  content: "Upload File";
}

/* ------- From Step 1 ------- */

/* file upload button */
input[type="file"]::file-selector-button {
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  margin-right: 16px;
  transition: background-color 200ms;

}

/* file upload button hover state */
input[type="file"]::file-selector-button:hover {
  background-color: #f3f4f6;
}

/* file upload button active state */
input[type="file"]::file-selector-button:active {
  background-color: #e5e7eb;
}

</style>