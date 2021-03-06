<template>
  <div>
    <!--
      User Story #1: My calculator should contain a clickable element 
      containing an = (equal sign) with a corresponding id="equals".
    -->
    <button id="equals" @click="calculate()">=</button>
    <!--
      User Story #2: My calculator should contain 10 clickable elements 
      containing one number each from 0-9, with the following corresponding 
      IDs: id="zero", id="one", id="two", id="three", id="four", id="five", 
      id="six", id="seven", id="eight", and id="nine".
    -->
    <button id="zero" @click="addToDiplay(0)">0</button>
    <button id="one" @click="addToDiplay(1)">1</button>
    <button id="two" @click="addToDiplay(2)">2</button>
    <button id="three" @click="addToDiplay(3)">3</button>
    <button id="four" @click="addToDiplay(4)">4</button>
    <button id="five" @click="addToDiplay(5)">5</button>
    <button id="six" @click="addToDiplay(6)">6</button>
    <button id="seven" @click="addToDiplay(7)">7</button>
    <button id="eight" @click="addToDiplay(8)">8</button>
    <button id="nine" @click="addToDiplay(9)">9</button>
    <!--
      User Story #3: My calculator should contain 4 clickable elements 
      each containing one of the 4 primary mathematical operators with 
      the following corresponding IDs: id="add", id="subtract", 
      id="multiply", id="divide".
    -->
    <button id="add" @click="addToDiplay('+')">+</button>
    <button id="subtract" @click="addToDiplay('-')">-</button>
    <button id="multiply" @click="addToDiplay('*')">*</button>
    <button id="divide" @click="addToDiplay('/')">/</button>
    <!--
      User Story #4: My calculator should contain a clickable element 
      containing a . (decimal point) symbol with a corresponding id="decimal".
    -->
    <button id="decimal" @click="addToDiplay('.')">.</button>
    <!--
      User Story #5: My calculator should contain a clickable element 
      with an id="clear".
    -->
    <button id="clear" @click="clear()">clear</button>
    <!--
      User Story #6: My calculator should contain an element to display 
      values with a corresponding id="display".
    -->
    <input id="display" v-model="value">
    <!--
      User Story #13: If 2 or more operators are entered consecutively, 
      the operation performed should be the last operator entered 
      (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, 
      the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, 
      the result should be -25 (i.e. 5 x (-5)).

      User Story #14: Pressing an operator immediately following = should start 
      a new calculation that operates on the result of the previous evaluation.

      User Story #15: My calculator should have several decimal places 
      of precision when it comes to rounding (note that there is no exact 
      standard, but you should be able to handle calculations like 2 / 7 
      with reasonable precision to at least 4 decimal places).

      Note On Calculator Logic: It should be noted that there are two main 
      schools of thought on calculator input logic: immediate execution logic 
      and formula logic. Our example utilizes formula logic and observes order 
      of operation precedence, immediate execution does not. Either is acceptable, 
      but please note that depending on which you choose, 
      your calculator may yield different results than ours for certain 
      equations (see below example). As long as your math can be verified 
      by another production calculator, please do not consider this a bug.

      EXAMPLE: 3 + 5 x 6 - 2 / 4 =

      Immediate Execution Logic: 11.5
      Formula/Expression Logic: 32.5
    -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "0"
    };
  },
  mounted() {
    const callMapNumPad = keyCode => {
      this.mapNumPad(keyCode);
    };

    window.addEventListener("keyup", e => {
      callMapNumPad(e.keyCode);
    });
  },
  methods: {
    /*
      User Story #7: At any time, pressing the clear button clears the input 
      and output values, and returns the calculator to its initialized state; 
      0 should be shown in the element with the id of display.
    */
    clear() {
      this.value = "0";
    },
    /*
      User Story #8: As I input numbers, I should be able to see my input 
      in the element with the id of display.

      User Story #9: In any order, I should be able to add, subtract, 
      multiply and divide a chain of numbers of any length, and when I hit =, 
      the correct result should be shown in the element with the id of display.

      User Story #10: When inputting numbers, my calculator should not allow 
      a number to begin with multiple zeros.
    */
    addToDiplay(toAdd) {
      /*
        User Story #11: When the decimal element is clicked, a . should append 
        to the currently displayed value; two . in one number should not be accepted.
      */
      const lastCharacterToInt = parseInt(
        this.value[this.value.length - 1],
        10
      );

      if (!Number.isInteger(lastCharacterToInt) && toAdd === ".") {
        return;
      }

      if (this.value === "0" && toAdd !== ".") {
        this.value = "";
      }

      this.value += toAdd;
    },
    calculate() {
      /*
        User Story #12: I should be able to perform any operation (+, -, *, /) 
        on numbers containing decimal points.
      */
      this.value = eval(this.value);
    },
    mapNumPad(keyCode) {
      switch (keyCode) {
        case 13:
          this.calculate();
          break;
        case 48:
        case 96:
          this.addToDiplay("0");
          break;
        case 49:
        case 97:
          this.addToDiplay("1");
          break;
        case 50:
        case 98:
          this.addToDiplay("2");
          break;
        case 51:
        case 99:
          this.addToDiplay("3");
          break;
        case 52:
        case 100:
          this.addToDiplay("4");
          break;
        case 53:
        case 101:
          this.addToDiplay("5");
          break;
        case 54:
        case 102:
          this.addToDiplay("6");
          break;
        case 55:
        case 103:
          this.addToDiplay("7");
          break;
        case 56:
        case 104:
          this.addToDiplay("8");
          break;
        case 57:
        case 105:
          this.addToDiplay("9");
          break;
        case 106:
          this.addToDiplay("*");
          break;
        case 107:
          this.addToDiplay("+");
          break;
        case 108:
          this.addToDiplay(".");
          break;
        case 109:
          this.addToDiplay("+");
          break;
        case 111:
          this.addToDiplay("/");
          break;
        default:
          break;
      }
    }
  }
};
</script>
