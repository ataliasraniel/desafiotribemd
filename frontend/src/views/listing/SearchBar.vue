<template>
  <div class="w-full mb-4 flex flex-col sm:flex-row gap-3">
    <input 
      type="text" 
      :value="searchQuery"
      @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      placeholder="Buscar ideias por título ou descrição..." 
      class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all" 
    />
    <select 
      :value="sortBy"
      @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
      class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-white"
    >
      <option value="recent">Mais recentes</option>
      <option value="oldest">Mais antigas</option>
      <option value="most-liked">Mais curtidas</option>
      <option value="least-liked">Menos curtidas</option>
    </select>
    <select 
      :value="filterByAuthor"
      @change="$emit('update:filterByAuthor', ($event.target as HTMLSelectElement).value)"
      class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-white"
    >
      <option value="all">Todas</option>
      <option value="mine">Minhas ideias</option>
      <option value="others">Outras ideias</option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  searchQuery: string
  sortBy: 'recent' | 'oldest' | 'most-liked' | 'least-liked'
  filterByAuthor: 'all' | 'mine' | 'others'
}

defineProps<Props>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:sortBy': [value: string]
  'update:filterByAuthor': [value: string]
}>()
</script>

<style scoped>
.focus\:border-primary:focus {
  border-color: var(--color-primary);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}
</style>
