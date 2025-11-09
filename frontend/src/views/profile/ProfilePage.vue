<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1 class="profile-title">Perfil</h1>
      
      <div class="profile-info">
        <div class="info-item">
          <span class="info-label">Nome</span>
          <span class="info-value">{{ userName }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Email</span>
          <span class="info-value">{{ userEmail }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Membro desde</span>
          <span class="info-value">{{ joinDate }}</span>
        </div>
      </div>
      <button class="logout-button" @click="handleLogout" :disabled="isLoading">
        {{ isLoading ? 'Saindo...' : 'Sair' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUser } from '../../stores/useUser'
import { useProfile } from './useProfile'

const { userName, userEmail, userCreatedAt, } = useUser()
const { isLoading, logout } = useProfile()

const joinDate = computed(() => {
  if (!userCreatedAt.value) return 'N/A'
  const date = new Date(userCreatedAt.value)
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
})

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.profile-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.profile-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  text-align: center;
  color: #111827;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.info-value {
  font-size: 1rem;
  color: #111827;
}

.logout-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #1f2937;
}

.logout-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .profile-card {
    padding: 2rem 1.5rem;
  }
  
  .profile-title {
    font-size: 1.5rem;
  }
}
</style>
