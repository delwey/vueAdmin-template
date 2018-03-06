<template>
  <imp-panel title="字段映射">
    <div slot="header">
      <el-button :disabled="disabled" @click="onProcess" type="primary">处 理</el-button>
      <el-button @click="onCancel">返 回</el-button>
      <el-progress :percentage="percent" status="success"></el-progress>
    </div>
    <div slot="body">
      <el-dialog :title="mapTitle" :visible.sync="dialogVisible" size="small">
        <el-table :data="selectData" stripe border height="400">
          <el-table-column label="" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.row.xlsColName" v-model="form.xlsColName"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="xlsColName" sortable label="excel字段名">
          </el-table-column>
          <el-table-column prop="userId" label="excel数据">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSave">保 存</el-button>
        </span>
      </el-dialog>

      <el-table :data="tableData" stripe border style="width: 100%" v-loading="listLoading">
        <el-table-column type="index" width="80">
        </el-table-column>
        <el-table-column prop="dbColName" sortable label="数据库字段名">
        </el-table-column>
        <el-table-column prop="dbColDesc" label="数据库字段描述">
        </el-table-column>
        <el-table-column prop="xlsColName" sortable label="XLS字段名">
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="small" type="default" icon="edit" @click="handleEdit('edit', scope.row)">映射
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </imp-panel>
</template>

<script>
import ImpPanel from '@/components/ImpPanel'
// import df from 'dateformat-util'
import { analysis, getPercent, saveMapping, selectableDbCols, getMapping } from '@/api/med/upload'

export default {
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    return {
      form: { mappingId: '', xlsColName: '' },
      listLoading: false,
      tableData: [],
      selectData: [],
      mapTitle: '',
      dialogVisible: false,
      disabled: false,
      percent: 0
    }
  },
  methods: {
    onProcess() {
      this.disabled = true
      var timer = setInterval(this.getPercent, 500)
      analysis(this.$route.query.uploadId).then(res => {
        this.percent = 100
        clearInterval(timer)
      })
    },
    getPercent() {
      getPercent(this.$route.query.uploadId).then(res => {
        this.percent = res.data
      })
    },
    onCancel() {
      this.$router.push({ path: 'upload' })
    },
    onSave() {
      saveMapping(this.form).then(res => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].mappingId === this.form.mappingId) {
            this.tableData[i].xlsColName = this.form.xlsColName
            break
          }
        }
      })
      this.dialogVisible = false
    },
    handleEdit(type, row) {
      this.mapTitle = row.dbColName + ' 映射'
      this.form.mappingId = row.mappingId
      selectableDbCols(this.$route.query.uploadId).then(res => { this.selectData = res.data })
      this.dialogVisible = true
    },
    loadData() {
      getMapping(this.$route.query.uploadId).then(res => { this.tableData = res.data })
    }
  },
  created() {
    this.loadData()
  }
}
</script>
