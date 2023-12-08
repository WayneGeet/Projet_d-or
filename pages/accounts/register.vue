<template>
    <section class="mx-auto max-w-2xl min-h-[100vh]">
        <form class="grid grid-cols-2 gap-10 w-full px-7 py-5 items-start justify-center" @submit.prevent="login">
            <article class="flex flex-col gap-5 items-start justify-center">
                <div class="">
                    <label for="f_name"></label>
                    <input class="w-full px-3 py-2 border border-white rounded-sm border-opacity-50" type="text" id="f_name" v-model="first_name">
                </div>
                <div class="">
                    <label for="l_name"></label>
                    <input class="w-full px-3 py-2 border border-white rounded-sm border-opacity-50" type="text" id="l_name" v-model="last_name">
                </div>
            </article>
            
        </form>
    </section>
</template>

<script>

</script>