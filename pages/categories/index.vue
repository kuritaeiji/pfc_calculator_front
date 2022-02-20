<template>
  <div>
    {{ $route.fullPath }}
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
