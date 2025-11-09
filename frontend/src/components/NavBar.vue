<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-brand">
        <router-link to="/listing" class="brand-link">
          <span class="brand-icon">💡</span>
          <span class="brand-name">IdeaLab</span>
        </router-link>
      </div>
      
      <div class="navbar-menu">
        <div class="navbar-user lg:block hidden">
        <span class="user-name">Olá, {{ userName }}!</span>
      </div>
        <router-link to="/listing" class="nav-link">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Ideias</span>
        </router-link>
        
        <router-link to="/profile" class="nav-link">
          <span class="nav-icon">👤</span>
          <span class="nav-text">Perfil</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUser } from '../stores/useUser';

const {userName} = useUser();
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s;
}

.brand-link:hover {
  opacity: 0.8;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  color: #6b7280;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f9fafb;
  color: #111827;
}

.nav-link.router-link-active {
  background-color: #fef3e2;
  color: #111827;
}

.nav-icon {
  font-size: 1.125rem;
}

.nav-text {
  display: block;
}

@media (max-width: 640px) {
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    border-bottom: none;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
    z-index: 1000;
  }
  
  .navbar-content {
    padding: 0;
    height: 4rem;
    justify-content: space-around;
  }
  
  .navbar-brand {
    display: none;
  }
  
  .navbar-menu {
    width: 100%;
    justify-content: space-around;
    gap: 0;
  }
  
  .nav-link {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border-radius: 0;
  }
  
  .nav-icon {
    font-size: 1.5rem;
  }
  
  .nav-text {
    display: block;
    font-size: 0.75rem;
  }
}
</style>