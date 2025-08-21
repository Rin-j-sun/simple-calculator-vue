<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="calculator">
    <input type="text" v-model="display" disabled />
    <div class="buttons">
      <button v-for="btn in buttons" :key="btn" @click="handleClick(btn)">
        {{ btn }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: '',
      currentInput: '',
      previousValue: '',
      operator: '',
      buttons: [
        '7','8','9','/','C',
        '4','5','6','*','±',
        '1','2','3','-','=',
        '0','.','+'
      ]
    };
  },
  methods: {
    handleClick(btn) {
      if (!isNaN(btn) || btn === '.') {
        this.currentInput += btn;
        this.display = this.currentInput;
      } else if (btn === 'C') {
        this.currentInput = '';
        this.previousValue = '';
        this.operator = '';
        this.display = '';
      } else if (btn === '±') {
        this.currentInput = (parseFloat(this.currentInput) * -1).toString();
        this.display = this.currentInput;
      } else if (btn === '=') {
        if (this.previousValue && this.operator && this.currentInput) {
          this.currentInput = this.operate(this.operator, this.previousValue, this.currentInput);
          this.display = this.currentInput;
          this.previousValue = '';
          this.operator = '';
        }
      } else {
        // операторы + - * /
        if (this.currentInput) {
          this.operator = btn;
          this.previousValue = this.currentInput;
          this.currentInput = '';
        }
      }
    },
    operate(op, a, b) {
      a = parseFloat(a);
      b = parseFloat(b);
      switch(op) {
        case '+': return (a + b).toString();
        case '-': return (a - b).toString();
        case '*': return (a * b).toString();
        case '/': return b === 0 ? 'Error' : (a / b).toString();
      }
    }
  }
};
</script>

<style>
#calculator { width: 250px; margin: 50px auto; padding: 20px; border-radius: 10px; background: #f7f7f7; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
input { width: 100%; height: 40px; margin-bottom: 10px; font-size: 1.2em; text-align: right; }
button { width: 45px; height: 45px; margin: 3px; font-size: 1.2em; }
.buttons { display: flex; flex-wrap: wrap; justify-content: center; }
</style>