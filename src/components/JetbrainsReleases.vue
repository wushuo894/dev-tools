<script setup>
import {onMounted, ref, watch} from 'vue'
import {getReleases, platforms, projects} from "../data/jetbrains.js";
import {ElMessage} from "element-plus";


let selectProjects = ref([])

let releases = ref({})
let releasesView = ref([])
let selectReleasesView = ref([])

let selectPlatform = ref('')

let latest = ref(true)

onMounted(async () => {
  releases.value = await getReleases(projects, latest.value)
  selectPlatform.value = platforms[0]
})

watch(selectPlatform, () => {
  releasesView.value = Object.values(releases.value)
      .map(it => it[selectPlatform.value])
      .filter(it => it)
      .flat(1)
})

watch(releases, () => {
  releasesView.value = Object.values(releases.value)
      .map(it => it[selectPlatform.value])
      .filter(it => it)
      .flat(1)
})

let selectProjectsChange = async () => {
  let selectProject = selectProjects['value']
  if (selectProject.length > 0) {
    releases.value = await getReleases(selectProject, latest.value)
  } else {
    releases.value = await getReleases(projects, latest.value)
  }
}

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

let handleSelectionChange = (data) => {
  selectReleasesView.value = data
}

let batchOpenUrl = () => {
  selectReleasesView.value.forEach((item) => {
    openUrl(item['link'])
  })
}

let batchCopy = () => {
  let s = selectReleasesView.value.map(it => it['link']).join(' \n')
  console.log(s);
  copy(s)
}

</script>

<template>
  <div>
    <el-form label-position="left">
      <el-form-item label="筛选">
        <el-checkbox-group v-model="selectProjects" @change="selectProjectsChange">
          <el-checkbox v-for="project in projects" :key="project.name" :label="project.name" :value="project"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="平台">
        <el-radio-group v-model="selectPlatform">
          <el-radio v-for="platform in platforms" :label="platform" :key="platform" :value="platform"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其他">
        <el-checkbox v-model="latest" label="latest" @change="selectProjectsChange"/>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="releasesView" stripe @selection-change="handleSelectionChange" row-key="link">
    <el-table-column type="selection" width="50">
    </el-table-column>
    <el-table-column width="90">
      <template #default="scope">
        <img :src="releasesView[scope.$index].icon" width="48" alt="icon">
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称"/>
    <el-table-column prop="version" label="版本"/>
    <el-table-column prop="date" label="日期"/>
    <el-table-column label="文件名">
      <template #default="scope">
        <span>
          {{ releasesView[scope.$index].link.split('/').pop() }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="大小">
      <template #default="scope">
        <span>
          {{ Number.parseFloat(releasesView[scope.$index].size / 1024 / 1024).toFixed(2) }}MB
        </span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button text bg type="primary" @click="copy(releasesView[scope.$index].link)">复制</el-button>
        <el-button text bg type="primary" @click="openUrl(releasesView[scope.$index].link)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="width: 100%;justify-content: end;display: flex;margin:12px 0;">
    <div>
      <el-button text bg type="primary" @click="batchCopy" :disabled="!selectReleasesView.length">批量复制</el-button>
      <el-button text bg type="primary" @click="batchOpenUrl" :disabled="!selectReleasesView.length">批量下载
      </el-button>
    </div>
  </div>
</template>
