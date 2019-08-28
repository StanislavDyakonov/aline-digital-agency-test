<template>
  <div
    class="calculator-formula-operator"
  >
    <input
      type="text"
      v-model.trim="item_.value"
      :class="{error: checkErrorOperator(item_.value)}"
    >
  </div>
</template>

<script>
  export const allowOperators = [
    '+',
    '-',
    '*',
    '/'
  ]

  export default {
    name: 'Operator',

    props: [
      'value'
    ],

    watch: {
      value (value) {
        this.item_ = { ...value }
      },
      'item_.value' (newValue, oldValue) {
        if (newValue !== oldValue) this.$emit('input', this.item_)
      }
    },

    created () {
      this.item_ = { ...this.value }
    },

    data: () => ({
      item_: {}
    }),

    methods: {
      checkErrorOperator (value) {
        if (!value.length) return true
        if (!allowOperators.includes(value)) return true
        return false
      }
    }
  }
</script>

<style lang="scss">

</style>
