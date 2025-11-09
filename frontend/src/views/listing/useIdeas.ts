import { onMounted, ref } from 'vue';
import { apiClient } from '../../services/apiClient'

export function useIdeas() {
  const ideas = ref<Array<IdeaModel>>([]);
  const isLoading = ref(false);


  async function fetchIdeas() {
    try {
      isLoading.value = true;
      console.log('Fetching ideas...');
      const response: any = await apiClient.get<Array<IdeaModel>>('/ideias');
      ideas.value = response;
      await Promise.resolve(new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      }));
    } catch (error) {
      console.log('Fetched ideas:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function voteIdea(id: number) {
    try {
      await apiClient.post(`/ideias/${id}/votar`);
      const idea = ideas.value.find(i => i.id === id);
      if (idea) {
        idea.has_voted = !idea.has_voted;
        idea.votes = idea.has_voted ? idea.votes + 1 : idea.votes - 1;
      }
    } catch (error) {
      console.log('Vote error:', error);
      throw error;
    }
  }

  async function deleteIdea(id: number) {
    try {
      await apiClient.delete(`/ideias/${id}`);
      ideas.value = ideas.value.filter(idea => idea.id !== id);
    } catch (error) {
      console.log('Delete error:', error);
      throw error;
    }
  }

  onMounted(() => {
    fetchIdeas();
  });

  return {
    ideas,
    isLoading,
    voteIdea,
    deleteIdea,
    refreshData: fetchIdeas,
  }
}