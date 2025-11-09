import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "../../services/apiClient";
import { useUser } from "../../stores/useUser";

export function useProfile() {
    const isLoading = ref(false);
    const router = useRouter();
    const { clearUser } = useUser();

    async function logout() {
        try {
            isLoading.value = true;
            await apiClient.post('/logout');

            apiClient.removeToken();
            clearUser();

            router.push('/signin');
        } catch (error) {
            console.log('Logout error:', error);
            apiClient.removeToken();
            clearUser();
            router.push('/signin');
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        logout,
    }
}
