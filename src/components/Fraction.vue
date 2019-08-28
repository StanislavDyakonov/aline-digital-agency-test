<template>
  <div
    class="calculator-formula-fraction"
  >
    <input
      type="phone"
      v-model.trim="item_.numinator"
      :class="{error: checkError(item_.numinator)}"
    >
    <span>—</span>
    <input
      type="phone"
      v-model.trim="item_.denominator"
      :class="{error: checkError(item_.denominator)}"
    >
  </div>
</template>

<script>
  export default {
    name: 'Fraction',

    props: [
      'value'
    ],

    watch: {
      value (value) {
        this.item_ = { ...value }
      },
      'item_.numinator' (newValue, oldValue) {
        if (newValue !== oldValue) this.$emit('input', this.item_)
      },
      'item_.denominator' (newValue, oldValue) {
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
      checkError (value) {
        if (!value.length) return true
        if (isNaN(value)) return true
        return false
      }
    }
  }
</script>

<style lang="scss">

</style>
