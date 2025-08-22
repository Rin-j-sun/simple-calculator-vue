<template>
  <div id="calculator">
    <input
        type="text"
        :value="display"
        class="calculator-display"
        :class="{ error: isError }"
        readonly
    />
    <div class="buttons">
      <button
          v-for="btn in buttons"
          :key="btn"
          @click="handleClick(btn)"
          :disabled="hasError && btn !== 'C'"
      >
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
      expression: '',
      currentInput: '',
      hasError: false,
      buttons: [
        '1','2','3','4','5',
        '6','7','8','9','C',
        '0','=','-','/',
        '*','.','+'
      ]
    };
  },
  computed: {
    display() { return this.expression; },
    isError() { return this.hasError; }
  },
  methods: {
    isOperator(ch) { return ['+','-','*','/'].includes(ch); },

    handleClick(btn) {
      if (this.hasError && btn !== 'C') return;

      if (!isNaN(btn) || btn === '.') {
        if (btn === '.' && this.currentInput.includes('.')) return;
        this.currentInput += btn;
        this.expression += btn;
      } else if (btn === 'C') {
        this.expression = '';
        this.currentInput = '';
        this.hasError = false;
      } else if (btn === '=') {
        if (!this.expression) return;
        try {
          const result = this.evaluateExpression(this.expression);
          if (Number.isFinite(result)) {
            this.expression = this.formatResult(result);
            this.currentInput = this.expression;
          } else {
            this.setError();
          }
        } catch {
          this.setError();
        }
      } else {
        const last = this.expression.slice(-1);

        if (
            btn === '-' &&
            (this.expression === '' || this.isOperator(last)) &&
            last !== '-'
        ) {
          this.currentInput = '-';
          this.expression += '-';
          return;
        }

        if (this.expression === '') return;

        if (this.isOperator(last)) {
          if (last === btn) return;
          this.expression = this.expression.slice(0, -1) + btn;
          this.currentInput = '';
          return;
        }

        this.expression += btn;
        this.currentInput = '';
      }
    },

    setError() {
      this.expression = 'Error';
      this.currentInput = '';
      this.hasError = true;
    },

    evaluateExpression(expr) {
      const tokens = this.tokenize(expr);
      if (tokens.length === 0) throw new Error("empty");
      const rpn = this.toRPN(tokens);
      const result = this.evalRPN(rpn);
      if (isNaN(result)) throw new Error("bad expression");
      return result;
    },

    tokenize(expr) {
      const tokens = [];
      let num = '';
      for (let i = 0; i < expr.length; i++) {
        const ch = expr[i];
        const prev = i > 0 ? expr[i - 1] : '';

        if (/\d|\./.test(ch) || (ch === '-' && (i === 0 || this.isOperator(prev)))) {
          num += ch;
        } else if (this.isOperator(ch)) {
          if (num !== '') { tokens.push(num); num = ''; }
          tokens.push(ch);
        } else {
          throw new Error("invalid char");
        }
      }
      if (num !== '') tokens.push(num);
      return tokens;
    },

    toRPN(tokens) {
      const out = [];
      const ops = [];
      const prec = { '+':1, '-':1, '*':2, '/':2 };

      tokens.forEach(t => {
        if (!isNaN(t)) {
          out.push(parseFloat(t));
        } else if (this.isOperator(t)) {
          while (ops.length && this.isOperator(ops[ops.length-1]) &&
          prec[ops[ops.length-1]] >= prec[t]) {
            out.push(ops.pop());
          }
          ops.push(t);
        }
      });
      while (ops.length) out.push(ops.pop());
      return out;
    },

    evalRPN(rpn) {
      const st = [];
      for (const t of rpn) {
        if (typeof t === 'number') {
          st.push(t);
        } else {
          if (st.length < 2) return NaN;
          const b = st.pop();
          const a = st.pop();
          if (t === '+') st.push(a + b);
          else if (t === '-') st.push(a - b);
          else if (t === '*') st.push(a * b);
          else if (t === '/') {
            if (b === 0) return NaN;
            st.push(a / b);
          }
        }
      }
      return st.length === 1 ? st[0] : NaN;
    },

    formatResult(n) {
      const rounded = parseFloat(n.toFixed(12));
      return Number.isInteger(rounded) ? String(rounded) : String(rounded);
    }
  }
};
</script>

<style src="../css/calculator.css"></style>
