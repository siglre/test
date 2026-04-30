<script setup>
const props = defineProps({
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const onInput = event => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <label class="field" :for="id">
    <span class="field__label">{{ label }}</span>
    <input
      :id="id"
      class="field__input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
  </label>
</template>
