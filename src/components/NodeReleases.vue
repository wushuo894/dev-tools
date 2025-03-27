<script setup>

import {getReleases} from "../data/node.js";
import {onMounted, ref, watch} from "vue";
import {ElMessage} from "element-plus";

let releases = ref([])
let releasesView = ref([])
let platform = ref('')
let platforms = ref(['macOS', 'linux', 'windows'])

onMounted(async () => {
  releases.value = await getReleases()
  platform.value = platforms.value[0]
})


let openUrl = (url) => window.open(url)

let copy = (v) => {
  const input = document.createElement('input');
  input.value = v
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  ElMessage.success('已复制')
}

watch(platform, () => {
  releasesView.value = releases.value.filter(it => it['os'] === platform.value)
})

</script>

<template>
  <div>
    <el-form>
      <el-form-item label="平台">
        <el-radio-group v-model="platform">
          <el-radio v-for="item in platforms" :key="item" :label="item" :value="item"/>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="releasesView" stripe>
    <el-table-column align="center">
      <template #default="scope">
        <img width="48" height="48" :src="`/icon/${releasesView[scope.$index].os}.svg`" alt="os">
      </template>
    </el-table-column>
    <el-table-column prop="fileName" label="文件名"/>
    <el-table-column prop="version" label="版本"/>
    <el-table-column prop="date" label="日期"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button text bg type="primary" @click="copy(releasesView[scope.$index].link)" icon="CopyDocument">复制</el-button>
        <el-button text bg type="primary" @click="openUrl(releasesView[scope.$index].link)" icon="Download">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
