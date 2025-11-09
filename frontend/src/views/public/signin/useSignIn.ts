import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "../../../services/apiClient";
import { useUser } from "../../../stores/useUser";

export function useSignIn() {
    const isLoading = ref(false);
    const router = useRouter();
    const { setUser } = useUser();

    async function signIn(data: { email: string; password: string }) {
        try {
            isLoading.value = true;
            const response: {
                message: string;
                access_token: string;
                token_type: string;
                user: any;
            } = await apiClient.post('/login', data);
            if (!response.access_token) {
                throw new Error('No access token received');
            }

            apiClient.setToken(response.access_token);
            setUser(response.user);

            router.push('/listing');
        } catch (error) {
            console.log('Sign in error:', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        signIn,
    }
}
