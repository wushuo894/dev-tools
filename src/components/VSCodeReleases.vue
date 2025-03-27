<script setup>
import {onMounted, ref} from "vue";
import {downloads, getVersions} from "../data/vscode.js";

let versions = ref([])
let version = ref('')
let type = ref('')

onMounted(async () => {
  versions.value = await getVersions()
  version.value = versions.value[0]
  type.value = 'macOS Apple silicon'
})

let download = () => {
  window.open(downloads[type.value].replace('{version}', version.value))
}

</script>

<template>
  <div style="display: flex; justify-content: center;width: 100%;">
    <el-form label-width="auto" style="min-width: 600px;">
      <el-form-item label="版本号">
        <el-select v-model="version" style="max-width: 200px;">
          <el-option v-for="item in versions" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="下载格式">
        <el-select v-model="type" style="max-width: 200px;">
          <el-option v-for="item in Object.keys(downloads)" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <div>
        <el-button bg text type="primary" :disabled="!version" @click="download" icon="Download">下载</el-button>
      </div>
    </el-form>
  </div>
</template>