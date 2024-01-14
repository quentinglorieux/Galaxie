<template>
    <div class="container mx-auto mt-8 p-8 bg-gray-100">
      <h1 class="text-2xl font-semibold mb-6">List of Teaching-Research Positions</h1>
  
      <!-- Column Selection, Search Bar, and Corps Filter on the same line -->
      <div class="flex items-center gap-4 mb-4">
        <div class="flex items-center">
          <label class="mr-2">Columns:</label>
          <USelectMenu v-model="selectedColumns" :options="allColumns" multiple></USelectMenu>
        </div>
  
        <div>
          <UInput v-model="searchQuery" placeholder="Search by Section" class="p-2 border border-gray-300" />
        </div>
  
        <div>
          <USelectMenu v-model="selectedCorps" :options="corpsOptions" multiple placeholder="Filter by Corps"></USelectMenu>
        </div>
      </div>
  
      <!-- Table -->
      <UTable :rows="filteredPosts" :columns="selectedColumns" :fields="selectedColumns" class="w-full bg-white border border-gray-300">
        <!-- ReferenceGalaxie column template -->
        <template #ReferenceGalaxie-data="{ row }">
          <span>
            <a :href="row.ReferenceGalaxie" target="_blank" rel="noopener noreferrer" class="flex items-center">
              <i class="fas fa-file-pdf text-red-500 mr-2"></i>
            </a>
          </span>
        </template>
  
        <!-- Add other body-cell templates as needed -->
  
      </UTable>
    </div>
  </template>
  
  <script setup>
//   import { ref, onMounted, computed } from 'vue';
//   import useScraping from '~/composables/useScrap';
  
  const posts = ref([]);
  const searchQuery = ref('');
  const allColumns = [
    { key: 'Etablissement', label: 'Etablissement', sortable: true },
    { key: 'ReferenceGalaxie', label: 'PDF', sortable: false },
    { key: 'Article', label: 'Article', sortable: false },
    { key: 'Corps', label: 'Corps', sortable: true },
    { key: 'Chaire', label: 'Chaire', sortable: true },
    { key: 'Section1', label: 'Section 1', sortable: false },
    { key: 'Section2', label: 'Section 2', sortable: false },
    { key: 'Section3', label: 'Section 3', sortable: false },
    { key: 'DateClotureCand', label: 'Cloture', sortable: false },
    { key: 'Localisation', label: 'Localisation', sortable: false },
    { key: 'Profil', label: 'Profil', sortable: false },
  ];
  const selectedColumns = ref(allColumns);
  const corpsOptions = [
    { key: 'MCF', label: 'MCF' },
    { key: 'PR', label: 'PR' }
  ];
  const selectedCorps = ref([]);
  
  const filteredPosts = computed(() => {
    return posts.value.map(post => {
      const filteredPost = {};
      allColumns.forEach(column => {
        if (selectedColumns.value.includes(column)) {
          filteredPost[column.key] = post[column.key];
        }
      });
      return filteredPost;
    }).filter(post =>
      post.Section1.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.Section2.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.Section3.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (selectedCorps.length === 0 || selectedCorps.includes(post.Corps))
    );
  });
  
  onMounted(async () => {
    posts.value = await useScrap('https://www.galaxie.enseignementsup-recherche.gouv.fr/ensup/ListesPostesPublies/Emplois_publies_TrieParCorps.html');
  });
  </script>
  
  <style scoped>
  /* Add additional styling as needed */
  </style>
  