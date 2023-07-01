<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :fill="color"
  >
    <path
      :stroke="color"
      stroke-width="2"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.29 16.29c-.39.39-1.02.39-1.41 0L12 14.41l-2.88 2.88c-.39.39-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41L10.59 12 7.71 9.12c-.39-.39-.39-1.02 0-1.41l.71-.71c.39-.39 1.02-.39 1.41 0L12 9.59l2.88-2.88c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41L13.41 12l2.88 2.88c.39.39.39 1.02 0 1.41l-.71.71z"
    />
  </svg>
</template>

<script>
export default {
  name: 'MySvg',
  props: {
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
    color: {
      type: String,
      default: 'black',
    },
  },
}
</script>
