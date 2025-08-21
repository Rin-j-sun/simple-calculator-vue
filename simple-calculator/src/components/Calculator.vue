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
import '../css/calculator.css';

export default {
  data() {
    return {
      display: '',
      currentInput: '',
      previousValue: '',
      operator: '',
      buttons: [
        '1','2','3','4','5',
        '6','7','8','9','0',
        '±','/','C','-','=',
        '*','.','+'
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

<style src="../css/calculator.css"></style>