<template>
    <div class="bg-yellow-500">

        <button type="button"
            class="Button mb-4 ml-2 z-40 px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-yellow-600 hover:bg-yellow-500 active:bg-blue-600">
            <i class="fas fa-lightbulb"></i> Insights
        </button>
    </div>
    <div class="flex">
        
    <div class="statistique-container flex items-start relative font-[sans-serif] ">
        <!-- Button beside and slightly above the card -->


        <!-- The Card -->
        <div
            class="statistique border border-gray-300 w-full max-w-sm rounded px-4 py-6 bg-white shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)] relative top-4 before:w-4 before:h-4 before:rotate-45 before:bg-white before:absolute before:-top-1.5 before:left-0 before:right-0 before:mx-auto">
            <div class="flex flex-wrap items-center cursor-pointer w-full border-b pb-2">
                <div class="ml-4 flex-1">
                    <p class="text-sm text-gray-500 font-semibold">WORK TIME CLASSIFICATION <i
                            class="fas fa-info-circle"></i>
                    </p>
                </div>
            </div>
            <p class="text-sm text-green-500 my-2 flex items-center">
                <i class="fas fa-circle text-green-500 text-xs mr-2"></i> <!-- Regular green circle icon -->
                20% Worked
            </p>

            <p class="text-sm text-red-500 my-2 flex items-center">
                <i class="fas fa-circle text-red-500 text-xs mr-2"></i> <!-- Regular red circle icon -->
                80% Non-worked
            </p>


            <div class="flex mb-2">
                <!-- <p class="text-sm text-gray-400 flex-1">25 GB</p>
          <p class="text-sm text-gray-400">50 GB</p> -->
            </div>
            <div class="bg-gray-600 rounded-full w-full h-2.5">
                <div class="w-1/2 h-full rounded-full bg-gray-600 flex items-center"></div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
    name: "StatistiqueActivity",
};


</script>

<style scoped>
/* Container to align the button and the card */
.statistique-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 5%;
    width: 40%;
    /* You can adjust this to position it as needed */
}

.Button {
    margin-left: 80%;
    position: absolute;
    background-color: rgb(188, 188, 26);

}
</style>