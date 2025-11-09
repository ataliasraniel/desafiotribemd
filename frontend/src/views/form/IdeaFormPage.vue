<template>
  <div class="form-container">
    <div class="form-content">
      <div class="form-header">
        <h1 class="form-title">{{ isEditing ? 'Editar Ideia' : 'Nova Ideia' }}</h1>
        <p class="form-subtitle">{{ isEditing ? 'Atualize as informações da sua ideia' : 'Compartilhe sua ideia com a comunidade' }}</p>
      </div>
      
      <form class="idea-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name" class="form-label">Nome da ideia</label>
          <input 
            type="text" 
            id="name" 
            v-model="ideaName" 
            class="form-input"
            placeholder="Um nome criativo para sua ideia"
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="description" class="form-label">Descrição</label>
          <textarea 
            id="description" 
            v-model="description" 
            class="form-textarea"
            placeholder="Descreva sua ideia em detalhes..."
            rows="6"
            maxlength="1000"
            required
          ></textarea>
          <span class="form-hint">{{ description.length }} / 1000 caracteres</span>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button" @click="cancel">Cancelar</button>
          <button type="submit" class="submit-button">
            {{ isEditing ? 'Atualizar Ideia' : 'Criar Ideia' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,  watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm } from './useForm'
const route = useRoute()
const id = route.params.id as string | undefined;
const { idea, submitIdea } = useForm(id);

const router = useRouter()
const ideaName = ref('')
const description = ref('')
const isEditing = ref(false)

watchEffect(()=>{
  if (idea.value) {
    isEditing.value = true
    ideaName.value = idea.value.title
    description.value = idea.value.description ?? '';
  }
})

const handleSubmit = async () => {
  await submitIdea({ title: ideaName.value, description: description.value });
  router.push('/listing');
}

const cancel = () => {
  router.push('/listing')
}
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: var(--color-background);
}

.form-content {
  max-width: 600px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 2rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #111827;
}

.form-subtitle {
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0;
}

.idea-form {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9375rem;
  color: #111827;
  transition: all 0.2s;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 177, 66, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #9ca3af;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-hint {
  font-size: 0.8125rem;
  color: #9ca3af;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
}

.cancel-button,
.submit-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button {
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
}

.cancel-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.submit-button {
  background-color: var(--color-primary);
  color: #111827;
  border: none;
}

.submit-button:hover {
  background-color: #e69d31;
}

@media (max-width: 640px) {
  .form-container {
    padding: 1.5rem 1rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .idea-form {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .cancel-button,
  .submit-button {
    width: 100%;
  }
}
</style>
