<template>
  <div class="calculator">
    <div class="calculator-formula">
      <component
        v-for="(item, index) in formula"
        :is="item.type === TYPE_FRACTION ? TYPE_FRACTION : TYPE_OPERATOR"
        v-model="formula[index]"
        :key="`cf${index}`"
      />
      <span>=</span>
      <div class="calculator-response">
        <span>{{response.numinator}}</span>
        <span>—</span>
        <span>{{response.denominator}}</span>
      </div>
    </div>
    <div>
      <span class="calculator-error" v-for="(error, index) in checkErrorInFormula" :key="index">{{error}}</span>
    </div>
    <button
      class="calculator-btn"
      @click="add"
    >
      Add fraction
    </button>
  </div>
</template>


<script>
  import Operator, { allowOperators } from '../components/Operator'
  import Fraction from '../components/Fraction'

  import {
    toFraction,
    calc
  } from '../utils'

  const TYPE_FRACTION = 'fraction'
  const TYPE_OPERATOR = 'operator'

  const emptyFraction = {
    type: TYPE_FRACTION,
    numinator: '',
    denominator: ''
  }
  const emptyOperator = {
    type: TYPE_OPERATOR,
    value: ''
  }

  export default {
    name: 'Calculator',

    components: {
      Operator,
      Fraction
    },

    created () {
      this.formula.push(emptyFraction)
      this.formula.push(emptyOperator)
      this.formula.push(emptyFraction)
    },

    data: () => ({
      TYPE_FRACTION: TYPE_FRACTION,
      TYPE_OPERATOR: TYPE_OPERATOR,

      formula: []
    }),

    computed: {
      checkErrorInFormula () {
        let errors = []

        const handler = (item, index) => {
          if (item.type === TYPE_FRACTION) {
            if (!item.numinator.length || !item.denominator.length) errors.push(`Заполните поля в ${index + 1} столбце формулы`)
            if (isNaN(item.numinator) || isNaN(item.denominator)) errors.push(`В ${index + 1} столбце формулы разрешены только цифры`)
          }

          if (item.type === TYPE_OPERATOR) {
            if (!item.value.length) errors.push(`Заполните поля в ${index + 1} столбце формулы`)
            else if (!allowOperators.includes(item.value)) errors.push(`В ${index + 1} столбце формулы разрешены только операторы ${allowOperators.join(', ')}`)
          }
        }
        this.formula.forEach(handler)

        return errors
      },
      formulaHandler () {
        if (!this.checkErrorInFormula) return NaN

        const preParseFormula = (item) => {
          if (item.type === TYPE_FRACTION) item.value = calc['/'](item.numinator, item.denominator)
          return item
        }
        let formula_ = this.formula.map(preParseFormula)

        const handler = (acc, item) => {
          if (acc.prev && acc.prev.type === TYPE_OPERATOR)
            acc.decimal = calc[acc.prev.value] && calc[acc.prev.value](acc.decimal, item.value) ?? NaN
          else if (acc.decimal === null)
            acc.decimal = item.value

          acc.prev = item

          return acc
        }

        let { decimal } = formula_.reduce(handler, {
          prev: null,
          decimal: null
        })

        return decimal
      },
      response () {
        const decimal = this.formulaHandler
        const [numinator, denominator] = toFraction(decimal)

        return {
          numinator,
          denominator
        }
      }
    },

    methods: {
      add () {
        this.formula.push(emptyOperator)
        this.formula.push(emptyFraction)
      }
    }
  }
</script>

<style lang="scss">
  .calculator {
    input {
      width: 24px;
      margin: 0 8px;
      padding: 0.25em .25em;

      border-radius: .25em;
      border-style: solid;
      text-align: center;

      appearance: none;
      -webkit-appearance: none;

      &.error {
        border-color: red;
      }
    }

    &-error {
      margin-top: 8px;

      display: block;

      color: red;
      font-size: 12px;
      line-height: 1.5;
    }

    &-formula {
      display: flex;
      align-items: center;
      justify-content: center;

      &-fraction {
        display: flex;
        flex-direction: column;
      }

      &-operator {

      }
    }

    &-response {
      margin-left: 8px;

      display: flex;
      flex-direction: column;
    }

    &-btn {
      margin-top: 24px;
      padding: 0.75em 2em;

      display: inline-block;

      color: #fff;

      background-color: #4fc08d;
      border-radius: 2em;
      border: 1px solid #4fc08d;

      transition: all 0.15s ease;
      box-sizing: border-box;
      cursor: pointer;;

      &:hover {
        background: #42b983;
      }
    }
  }
</style>
