import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "../../../services/apiClient";
import { useUser } from "../../../stores/useUser";

export function useSignUp() {
    const isLoading = ref(false);
    const router = useRouter();
    const { setUser } = useUser();

    async function signUp(data: { name: string; email: string; password: string; password_confirmation: string }) {
        try {
            isLoading.value = true;
            const response: {
                message: string;
                access_token: string;
                token_type: string;
                user: {
                    id: number;
                    name: string;
                    email: string;
                    created_at: string;
                }
            } = await apiClient.post('/register', data);

            apiClient.setToken(response.access_token);
            setUser(response.user);

            router.push('/listing');
        } catch (error) {
            console.log('Sign up error:', error);
            alert('Erro ao criar conta. Tente novamente.');
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        signUp,
    }
}
