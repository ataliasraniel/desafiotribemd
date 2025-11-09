import { onMounted, ref } from "vue";
import { apiClient } from "../../services/apiClient";

export function useForm(id: string | number | undefined) {
    const idea = ref<IdeaModel | null>(null);
    const isLoading = ref(false);


    async function fetchIdeaById() {
        try {
            isLoading.value = true;
            const response: IdeaModel = await apiClient.get<IdeaModel>(`/ideias/${id}`);
            idea.value = response;

        } catch (error) {
            console.log('Fetched idea by id:', error);
        } finally {
            isLoading.value = false;
        }
    }

    async function submitIdea(data: { title: string; description: string }) {
        try {
            isLoading.value = true;
            if (id) {
                // Update existing idea
                await apiClient.put(`/ideias/${id}`, data);
            } else {
                // Create new idea
                await apiClient.post('/ideias', data);
            }
        } catch (error) {
            console.log('Submit idea error:', error);
            alert('Submit idea error: ' + error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        if (id) {
            fetchIdeaById();
        }
    });

    return {
        idea,
        isLoading,
        submitIdea,
    }
}