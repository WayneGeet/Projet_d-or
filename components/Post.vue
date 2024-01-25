<template>
    <div class="relative">
        <div v-if="isLiked" class="absolute rounded-full bg-slate-100 p-2 text-center left-3 top-3 bg-opacity-70"><IconesHeart/></div>
        <div v-else class="absolute rounded-full bg-slate-100 p-2 text-center left-3 top-3 bg-opacity-70"><IconesHeartLike/></div>
        <div class="">
            <img class="w-full object-center h-32 object-cover overflow-hidden" :src="photo" :alt="name">
        </div>
        <div class="px-3 py-2 flex flex-col gap-1">
            <h2 class="font-semibold text-xl text-gray-800">{{ budget }}</h2>
            <h3 class="text-gray-500 text-sm pb-2">{{ name }}</h3>
            <p class="text-xs flex items-center gap-1 text-gray-400 font-medium"><span class="text-sky-400"><IconesLocations/></span> {{ location }}</p>
            <div class="flex gap-12 text-gray-400 items-center">
                <p class="flex items-center gap-[5px] text-xs"><span class="text-sky-400"><IconesPhase/></span>{{ phase }}</p>
                <p class="flex items-center gap-[5px] text-xs"><span class="text-sky-400"><IconesProjectType/></span>{{ project_type }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
defineProps(['name', 'budget', 'location','photo', 'phase', 'project_type', 'isLiked'])
</script>

<style scoped>

</style>