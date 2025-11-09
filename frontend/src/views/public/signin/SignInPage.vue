<template>
  <div class="signin-container">
    <div class="background-text">
      <div class="scroll-text">IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡</div>
      <div class="scroll-text scroll-reverse">IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡</div>
      <div class="scroll-text">IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡</div>
      <div class="scroll-text scroll-reverse">IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡</div>
      <div class="scroll-text">IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡 IdeaLab💡</div>
    </div>
    
    <div class="signin-card">
        <div class="w-full flex flex-col items-start gap-2 mb-6">
            <h1 class="signin-title">Bem-vindo</h1>
            <p class="signin-subtitle">Por favor, entre na sua conta</p>

        </div>
      
      <form class="signin-form" @submit.prevent="handleSignIn">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="form-input"
            placeholder="seu@email.com"
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Senha</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="form-input"
            placeholder="••••••••"
            required 
          />
        </div>
        
        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
      
      <p class="signup-link">
        Não tem uma conta? 
        <a href="/signup">Criar conta</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSignIn } from './useSignIn'

const { isLoading, signIn } = useSignIn()

const email = ref('')
const password = ref('')

const handleSignIn = async () => {
  await signIn({
    email: email.value,
    password: password.value
  })
}
</script>

<style scoped>
.signin-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--color-background);
  overflow: hidden;
}

.background-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  pointer-events: none;
  z-index: 0;
}

.scroll-text {
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(255, 177, 66, 0.08);
  white-space: nowrap;
  animation: scrollLeft 40s linear infinite;
}

.scroll-reverse {
  animation: scrollRight 40s linear infinite;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.signin-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.signin-title {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #111827;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  color: #374151;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9375rem;
  color: #111827;
  transition: all 0.2s;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 177, 66, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.submit-button {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-primary);
  color: #111827;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #e69d31;
  border-color: transparent;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.signup-link a {
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .scroll-text {
    font-size: 3rem;
  }
  
  .signin-card {
    padding: 2rem 1.5rem;
  }
  
  .signin-title {
    font-size: 1.5rem;
  }
}
</style>
