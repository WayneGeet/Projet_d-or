<template>
    <div>
        <Navbar></Navbar>
        <section class="flex">
            <SideBar/>
            <div class="pl-5 border border-l-gray-300 border-opacity-80 h-[100dvh] flex-grow">
                <slot/>
                
            </div>
            
        </section>
        
        
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>