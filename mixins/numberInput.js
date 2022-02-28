export default {
  computed: {
    lastCharIsCommaAndLastSecondCharIsNumber () {
      return (string) => {
        const lastChar = string.slice(-1)
        const lastSecondChar = string.slice(-2)[0]
        return lastChar === '.' && typeof Number(lastSecondChar) === 'number'
      }
    }
  },
  methods: {
    setOnlyNumber (attrName, newVal) {
      if (this.lastCharIsCommaAndLastSecondCharIsNumber(newVal)) {
        this.$refs[attrName].lazyValue = newVal
        this.$emit(`update:${attrName}`, newVal)
        return null
      }

      const num = Number(newVal)
      if (typeof num === 'number') {
        this.$refs[attrName].lazyValue = num
        this.$emit(`update:${attrName}`, num)
        return null
      }

      this.$refs[attrName].lazyValue = this[attrName]
    }
  }
}
