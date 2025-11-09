import { ref, computed } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
}

const currentUser = ref<User | null>(null);

export function useUser() {
    const isAuthenticated = computed(() => currentUser.value !== null);

    const userName = computed(() => currentUser.value?.name || '');

    const userEmail = computed(() => currentUser.value?.email || '');

    const userId = computed(() => currentUser.value?.id || null);

    const userCreatedAt = computed(() => currentUser.value?.created_at || '');

    function setUser(user: User) {
        currentUser.value = user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    function loadUser() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                currentUser.value = JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                clearUser();
            }
        }
    }

    function clearUser() {
        currentUser.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    function getUser() {
        return currentUser.value;
    }

    loadUser();

    return {
        currentUser,
        isAuthenticated,
        userName,
        userEmail,
        userId,
        userCreatedAt,
        setUser,
        loadUser,
        clearUser,
        getUser,
    };
}
