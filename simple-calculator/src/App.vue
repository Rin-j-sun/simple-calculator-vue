<template>
  <div id="app">
    <header class="app-header">
      <h1>Мой калькулятор</h1>
      <div class="button-wrapper">
        <button @click="showCalculator = !showCalculator">
          {{ showCalculator ? 'Скрыть калькулятор' : 'Перейти к калькулятору' }}
        </button>
      </div>
    </header>

    <main class="app-main">
      <Calculator v-if="showCalculator" />
    </main>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';

export default {
  components: { Calculator },
  data() {
    return {
      showCalculator: false
    };
  }
};
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 20px;
  background: #f0f4f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-header {
  margin-bottom: 40px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.2em;
  color: #333;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 30px;
  font-size: 1em;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  min-width: 200px;
  max-width: 90%;
  white-space: nowrap;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.app-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

/* Адаптив */
@media (max-width: 480px) {
  h1 {
    font-size: 1.6em;
  }
  button {
    padding: 10px 20px;
    font-size: 0.95em;
  }
}
</style>
