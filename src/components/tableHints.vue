<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>*Примечание: {{ msg }}</div>
</template>
