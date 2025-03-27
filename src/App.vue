<script setup>
import JetbrainsReleases from './components/JetbrainsReleases.vue'
import NodeReleases from "./components/NodeReleases.vue";
</script>

<template>
  <el-tabs>
    <el-tab-pane label="Jetbrains" :lazy="true">
      <JetbrainsReleases/>
    </el-tab-pane>
    <el-tab-pane label="NodeJs" :lazy="true">
      <NodeReleases/>
    </el-tab-pane>
  </el-tabs>
</template>

