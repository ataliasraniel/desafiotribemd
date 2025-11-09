<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="w-full flex flex-col items-start gap-2 mb-6">
        <h1 class="signup-title">Criar conta</h1>
        <p class="signup-subtitle">Preencha os dados para começar</p>
      </div>
      
      <form class="signup-form" @submit.prevent="handleSignUp">
        <div class="form-group">
          <label for="name" class="form-label">Nome</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            class="form-input"
            placeholder="Seu nome completo"
            required 
          />
        </div>
        
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
        
        <div class="form-group">
          <label for="password_confirmation" class="form-label">Confirmar Senha</label>
          <input 
            type="password" 
            id="password_confirmation" 
            v-model="passwordConfirmation" 
            class="form-input"
            placeholder="••••••••"
            required 
          />
        </div>
        
        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? 'Criando...' : 'Criar conta' }}
        </button>
      </form>
      
      <p class="signin-link">
        Já tem uma conta? 
        <a href="/signin">Entrar</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSignUp } from './useSignup'

const { isLoading, signUp } = useSignUp()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const handleSignUp = async () => {
  await signUp({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value
  })
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--color-background);
}

.signup-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.signup-title {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #111827;
}

.signup-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.signup-form {
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

.signin-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.signin-link a {
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
}

.signin-link a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .signup-card {
    padding: 2rem 1.5rem;
  }
  
  .signup-title {
    font-size: 1.5rem;
  }
}
</style>
