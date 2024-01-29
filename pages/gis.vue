<template>
    <div class="max-h-screen overflow-auto max-w-full">
        <h1 class="text-4xl text-center">What is GIS <span class="text-red-400 font-bold">?</span></h1>
        <div class="max-w-5xl mx-auto ">
            <section v-for="i in items" :key="i.id">
                <article>
                    <h3 class="font-bold text-[#228CDB]">{{ i.heading }}</h3>
                </article>
                <article>
                    <p class="text-sm text-gray-600">{{ i.info }}</p>
                </article>
            </section>
        </div>
    </div>
</template>

<script setup>
const items = ref([
    {heading:"Site Selection",
info:"Businesses often need to choose optimal locations for facilities such as stores, warehouses, or manufacturing plants. GIS can analyze factors like demographics, traffic patterns, and proximity to suppliers or customers to aid in strategic site selection."},
{heading:"Market Analysis",
info:"GIS can be used to analyze market trends and customer behavior based on geographical information. This helps businesses understand the distribution of their target audience, identify potential markets, and optimize marketing strategies."},
{info:"GIS can be used to analyze market trends and customer behavior based on geographical information. This helps businesses understand the distribution of their target audience, identify potential markets, and optimize marketing strategies.",
heading:"Logistics and Supply Chain Management"},
{heading:"Customer Relationship Management (CRM)",
info:"Location-based data in GIS can enhance CRM systems. Businesses can use GIS to map customer locations, analyze their preferences, and tailor marketing strategies based on regional characteristics."},
{heading:"Competitor Analysis",
info:"GIS can be used to map the locations of competitors and analyze market saturation. This information can be valuable for making informed decisions about market positioning and differentiation strategies."},
{heading:"Real Estate Development",
info:"GIS is widely used in real estate to assess land values, zoning regulations, and plan urban development. It aids in making informed decisions about property investments and development projects."},
{heading:"Environmental Impact Assessment",
info:" Businesses involved in construction, mining, or other activities impacting the environment can use GIS for environmental impact assessments. It helps in understanding the potential effects of business activities on the surrounding ecosystem."}
])
</script>

<style scoped>

</style>