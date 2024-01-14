<template>
    <a :href="link" target="_blank">PDF Link</a>
  </template>
  
  <script>
  export default {
    props: {
      link: String,
    },
  };
  </script>