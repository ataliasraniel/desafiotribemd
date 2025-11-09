<template>
  <div class="listing-container">
    <div v-if="isLoading">Carregando ideias...</div>
    <div class="listing-content" v-else>
      <div class="header">
        <div>
          <h1 class="title">Ideias</h1>
          <p class="text-gray-600">
            {{ filteredIdeas.length }} de {{ ideas.length }} {{ ideas.length === 1 ? 'ideia' : 'ideias' }}
          </p>
        </div>
        <button class="new-button" @click="createNewIdea">
          <span class="button-icon">+</span>
          Nova Ideia
        </button>
      </div>
      
      <div v-if="ideas.length === 0" class="empty-state">
        <div class="empty-icon">💡</div>
        <h3 class="empty-title">Nenhuma ideia ainda</h3>
        <p class="empty-text">Comece criando sua primeira ideia</p>
        <button class="empty-button" @click="createNewIdea">Criar primeira ideia</button>
      </div>
      
      <div v-else>
        <SearchBar 
          v-model:search-query="searchQuery"
          v-model:sort-by="sortBy"
          v-model:filter-by-author="filterByAuthor"
        />

        <p v-if="filteredIdeas.length === 0" class="text-center text-gray-500 py-12">
          Nenhuma ideia encontrada com os filtros selecionados.
        </p>
        
        <div class="ideas-list" v-else>
          <IdeaCard
            v-for="idea in filteredIdeas"
            :key="idea.id"
            :idea="idea"
            :has-voted="true"
            :is-author="idea.user_id == userId"
            @edit="editIdea"
            @delete="deleteIdea"
            @vote="handleVote"
          />
        </div>
      </div>
      <div class="h-28 lg:hidden"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useIdeas } from './useIdeas'
import IdeaCard from '../../components/IdeaCard.vue'
import SearchBar from './SearchBar.vue'
import { useUser } from '../../stores/useUser'

const { isLoading, ideas, voteIdea, deleteIdea: removeIdea, refreshData } = useIdeas()
const router = useRouter()
const { userId } = useUser()

const searchQuery = ref('')
const sortBy = ref<'recent' | 'oldest' | 'most-liked' | 'least-liked'>('recent')
const filterByAuthor = ref<'all' | 'mine' | 'others'>('all')

const filteredIdeas = computed(() => {
  let result = [...ideas.value]
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(idea => 
      idea.title.toLowerCase().includes(query) || 
      idea.description?.toLowerCase().includes(query)
    )
  }
  
  if (filterByAuthor.value === 'mine') {
    result = result.filter(idea => idea.user_id === userId.value)
  } else if (filterByAuthor.value === 'others') {
    result = result.filter(idea => idea.user_id !== userId.value)
  }
  
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'recent':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case 'most-liked':
        return b.votes - a.votes
      case 'least-liked':
        return a.votes - b.votes
      default:
        return 0
    }
  })
  
  return result
})

const createNewIdea = () => {
  router.push('/form')
}

const editIdea = (id: number) => {
  router.push(`/form/${id}`)
}

const deleteIdea = async (id: number) => {
  if (confirm('Tem certeza que deseja deletar esta ideia?')) {
    try {
      await removeIdea(id)
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Erro ao deletar ideia. Tente novamente.')
    }
  }
}

const handleVote = async (id: number) => {
  try {
    await voteIdea(id)
  } catch (error) {
    console.error('Error voting:', error)
  }
  finally{
    refreshData()
  }
}
</script>

<style scoped>
.listing-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: var(--color-background);
}

.listing-content {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #111827;
}

.subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.new-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: var(--color-primary);
  color: #111827;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.new-button:hover {
  background-color: #e69d31;
}

.button-icon {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.empty-text {
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.empty-button {
  padding: 0.625rem 1.25rem;
  background-color: var(--color-primary);
  color: #111827;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.empty-button:hover {
  background-color: #e69d31;
}

.ideas-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 640px) {
  .listing-container {
    padding: 1.5rem 1rem;
  }
  
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .new-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
