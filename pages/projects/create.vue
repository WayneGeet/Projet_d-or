<template>
    <div class="bg-slate-200 min-h-screen flex items-center">
        <form method="POST" @submit.prevent="handleSubmit" class="max-w-lg mx-auto rounded-lg relative bg-gray-300 w-full px-20 py-10">
            <div class="">
                <label for="project_name">Project Name</label>
                <input type="text" name="project_name" id="project_name" v-model="project_name">
            </div>

            <div class="">
                <label for="budget">Project Budget</label>
                <input type="text" name="budget" id="budget" v-model="budget">
            </div>

            <div class="">
                <label for="project-type">Project Type</label>
                <select id="project-type" v-model="selected_type">
                    <option disabled value="">Please select one</option>
                    <option>Initial</option>
                    <option>Planning</option>
                    <option>Execution</option>
                    <option>Closing</option>
                </select>
            </div>

            <div class="">
                <label for="locate">Upload Photo</label>
                <input type="file" @change="handleImageUpload" name="" id="">
            </div>
            <div class="">
                <label class="flex items-center gap-4" for="locate"><span>
                        <IconesFlag />
                    </span>Select project location</label>
                <input @focus="handleFocus" type="text" name="locate" id="locate">
                </div>
                <button type="submit">Submit</button>
        </form>
        <div v-if="showDialog" class="px-7 py-4 rounded-md absolute min-w-6xl bg-white top-0 z-10 overflow-hidden w-3/4">
            
            <!-- Body -->
            <article v-if="!showMap" class="min-w-6xl gap-10 " :class="{ 'grid grid-cols-2 gap-4': !showMap, '': showMap }">
                <section class="w-full ">
                    <!-- heading -->
                    <div class="flex items-center mb-5">
                        <h3 v-if="!showMap" class="text-2xl font-bold mx-auto text-center">Select the location of the project</h3>
                        <h3 v-else class="text-3xl font-bold mx-auto text-center">Pin your address on the map</h3>
                        <span @click="showDialog = false, showMap = false" class="text-2xl flex items-center relative top-1">
                            <IconesClose />
                        </span>
                    </div>

                    <article class="w-full gap-4 relative flex items-center mb-[10rem]">
                        <label for="location" class=""><IconesFlag /></label>
                        <span class="relative w-full">
                            <input class="w-full" type="text" name="location" id="location" v-model="search_text" placeholder="Where's the project?"/>
                            <span @click="search_text='' " class="p-[4px] rounded-full bg-gray-400 absolute text-white top-1/2 mr-2 cursor-pointer -translate-y-1/2 right-0 text-md"><IconesClose/></span>
                        </span>
                        

                        <!---------------------- list of places ----------------------------->

                        <article v-if="places_dialog" class="rounded-md shadow-lg shadow-grey-600 px-1 min-h-[3rem] absolute top-[2.5rem] left-8 flex flex-col gap-1 bg-white w-[90%]">
                            
                            <img v-if="pend" class="w-10" src="~/assets/images/loader_2.gif" alt="loading">
                            <div v-else-if="!pend && places.length" @click="handlePlaceSelect(local)" class="cursor-pointer hover:bg-slate-200" v-for="local in computed_places"
                                :key="`${local.text} ${local.place_name}`">
                                <h4 class="font-semibold">{{ local.text }}</h4>
                                <p class="place_name">{{ local.place_name }}</p>
                            </div>
                            <p v-else-if="places.length === 0" class="text-center font-semibold my-auto">Not found</p>
    
                        </article>
                    </article>
                    

                    <article class="w-full flex items-center gap-4 mb-[10rem]">
                        <button class="text-lime-600 text-[1rem]">
                            <IconesHere />
                        </button>
                        <span>Use current location</span>
                    </article>
                    <p @click="showMap = true" class="font-semibold text-lime-600 cursor-pointer">Or select point from map</p>
                </section>

                <section class="aspect-video overflow-hidden top-1/2">
                    <!-- <img class="object-cover aspect-video" src="~/assets/images/location.jpg" alt="location" /> -->
                    <Mapbox :lat="lnglat[1]" :lng="lnglat[0]" :zoom="zoom" style="position: relative;"/>
                </section>

                <!-- <article v-if="showMap">
                    <Mapbox />
                </article> -->
            </article>

        </div>

        <section v-if="showDialog" class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60"
            @click="showDialog = false">
        </section>
        

        

    </div>
</template>

<script setup>
// const longitude = ref("")
// const latitude = ref("")
const selected_type = ref("Please select one")
const search_text = ref("")
const showDialog = ref(false)
const budget = ref("")
const project_name = ref("")
const handleFocus = () => {
    showDialog.value = true
}
const showMap = ref(false)
const pend = ref(true)
const places = ref(null)
const computed_places = ref(null)
const places_dialog = ref(false)
watchEffect(() => {
    if(search_text.value){
        places_dialog.value = true
    }
    else places_dialog.value = false
})


const fetchPlaces = async () => {
    // places_dialog.value = true
    const { data, pending } = await useLazyFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text.value}.json?access_token=pk.eyJ1Ijoid2F5bmUtZ2VldCIsImEiOiJjbGtjZWlnOXQwMmRiM2twZG05b2VldmcyIn0.93DilXpZMzPqgn_C7Y7L3w&country=KE`, {
    })
    const places_value = await data.value
    pend.value = pending.value
    console.log(pend.value)
    places.value = places_value?.features
    const places_computed = computed(() => {
        return places.value?.filter((place, index) => index <=2)
    })
    computed_places.value = places_computed.value
}

watch(search_text, fetchPlaces)

// gis
const lnglat = ref([-0.02, 37.08])
const zoom = ref(8)
// const isPlaces = ref(false)//this determines whether the modal showing the places array is hidden or shown...a bit of an overkill but wth
// const handleMouseEnter =(event, first, second) => {
//     isIn.value = true
//     console.log("its in")
//     // search_text.value = first + " " + second
//     const input = document.getElementById("location")
//     input.innerText = first + " " + second
// }
// const handleMouseLeave = () => {
//     isIn.value = false
//     console.log(isIn.value, "left the place")
// }
const handlePlaceSelect = (location) => {
    lnglat.value = location.center
    search_text.value = ""
    console.log(lnglat.value)
}
// File upload
const selectedImage = ref(null)
const handleImageUpload = (event) => {
    selectedImage.value = event.target.files[0]
}

const handleSubmit = async () => {
    const fd = new FormData()
    fd.append("photo", selectedImage.value, selectedImage.value.name)
    fd.append("location", JSON.stringify({ type: "Point", coordinates: [37.024, -0.123] }));
    fd.append("budget", budget.value);
    fd.append("name", project_name.value);
    fd.append("project_type", selected_type.value);
    console.log(fd)
    const {data, error, pending} = await useFetch("http://127.0.0.1:8000/projects/",{
        method:"POST",
        headers:{
            "Content-Type":"multipart/form-data",
            
        },
        body:fd
    })
    const response = await data.value
    console.log(response)
}




</script>

<style scoped>
input,
select {
    display: block;
    outline: 1px solid rgb(8, 167, 167);
    border: none;
    width: 100%;
    border-radius: 1rem;
    padding: 0.3rem 1.2rem;
}
label {
    font-size:1rem;
    padding-top:1rem;
}

.place_name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>