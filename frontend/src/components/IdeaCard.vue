<template>
  <div class="card idea-card" @click="handleClick">
    <div class="idea-header">
      <h3 class="idea-name">{{ idea.title }}</h3>
      <div class="flex flex-row gap-2 text-sm">
        <span class="text-primary font-bold" v-if="isAuthor">Por você</span>
          <span v-else>Por {{ idea.author_name }}</span>
        <span>{{ getDateRefined }}</span>
      </div>
<span></span>      <button
      v-if="!props.isAuthor" 
        class="idea-likes" 
        :class="{ 'liked': hasVoted }"
        @click.stop="handleVote"
        :disabled="isVoting"
      >
        <span class="like-icon">{{ hasVoted ? '❤️' : '🤍' }}</span>
        <span class="like-count">{{ currentLikes }}</span>
      </button>
      <span
        v-else
            class="idea-likes"
      >{{ currentLikes }}</span>
    </div>
    <div class="flex flex-col ">
        <p class="idea-description italic">"{{ idea.description }}"</p>

    </div>
    <div class="idea-actions" v-if="props.isAuthor">
      <button class="edit-button" @click.stop="$emit('edit', idea.id)">Editar</button>
      <button class="delete-button" @click.stop="$emit('delete', idea.id)">Deletar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'



interface Props {
  idea: IdeaModel
  
  isAuthor: boolean;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
  click: [id: number]
  vote: [id: number]
}>()

const isVoting = ref(false)
const hasVoted = ref(props.idea.has_voted)
const currentLikes = ref(props.idea.votes)

const getDateRefined = computed(() => {
  const date = new Date(props.idea.created_at);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
});

const handleVote = async () => {
  if (isVoting.value) return
  
  isVoting.value = true
  
  const previousState = hasVoted.value
  const previousLikes = currentLikes.value
  
  hasVoted.value = !hasVoted.value
  currentLikes.value = hasVoted.value ? currentLikes.value + 1 : currentLikes.value - 1
  
  try {
    emit('vote', props.idea.id)
    await new Promise(resolve => setTimeout(resolve, 300))
  } catch (error) {
    hasVoted.value = previousState
    currentLikes.value = previousLikes
    console.error('Vote error:', error)
  } finally {
    isVoting.value = false
  }
}

const handleClick = () => {
  emit('click', props.idea.id)
}
</script>

<style scoped>
.idea-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.idea-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.idea-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.idea-name {
  font-size: 1.125rem;
  font-weight: 600;
  text-align: start;
  margin: 0;
  color: #111827;
  flex: 1;
}

.idea-likes {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background-color: #fef3e2;
  border: 1px solid transparent;
  border-radius: 16px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.idea-likes:hover:not(:disabled) {
  background-color: #fed7aa;
  transform: scale(1.05);
}

.idea-likes.liked {
  background-color: #fee2e2;
  border-color: #fecaca;
}

.idea-likes.liked:hover:not(:disabled) {
  background-color: #fecaca;
}

.idea-likes:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.like-icon {
  font-size: 1rem;
  transition: transform 0.2s;
}

.idea-likes:active:not(:disabled) .like-icon {
  transform: scale(1.3);
}

.like-count {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.idea-description {
  font-size: 0.9375rem;
  margin: 0 0 1rem 0;
  color: #6b7280;
  text-align: left;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}

.idea-actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.edit-button,
.delete-button {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #ffffff;
}

.edit-button {
  color: #111827;
}

.edit-button:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.delete-button {
  color: #dc2626;
}

.delete-button:hover {
  background-color: #fef2f2;
  border-color: #fecaca;
}

@media (max-width: 640px) {
  .idea-header {
    flex-direction: column;
    align-items: start;
  }
  
  .idea-likes {
    align-self: flex-start;
  }
  
  .idea-actions {
    flex-direction: column;
  }
  
  .edit-button,
  .delete-button {
    width: 100%;
  }
}
</style>
