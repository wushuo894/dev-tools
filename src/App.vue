<script setup>
import JetbrainsReleases from './components/JetbrainsReleases.vue'
</script>

<template>
  <el-tabs>
    <el-tab-pane label="Jetbrains" :lazy="true">
      <JetbrainsReleases/>
    </el-tab-pane>
  </el-tabs>
</template>

