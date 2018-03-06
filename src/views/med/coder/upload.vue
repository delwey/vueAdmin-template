<template>
  <imp-panel title="上传管理">
    <div slot="header">
      <el-upload class="upload-demo" drag multiple name="uploadedFile" :headers="uploadHeaders" :on-success="handleSuccess" :action="uploadAction">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传csv/xls/xlsx文件</div>
      </el-upload>
    </div>
    <div slot="body">
      <el-table :data="tableData.rows" stripe border style="width: 100%" v-loading="listLoading">
        <el-table-column prop="uploadNo" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名">
        </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" :formatter="dateFmt">
        </el-table-column>
        <el-table-column prop="creator" label="上传人">
        </el-table-column>
        <el-table-column prop="total" label="总记录数">
        </el-table-column>
        <el-table-column prop="processed" label="已处理记录数">
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" type="default" icon="caret-right" :disabled="scope.row.status == 1" @click="handleEdit(scope.$index, scope.row)">处 理
            </el-button>
            <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)">删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.currentPage" :page-sizes="[5, 10, 20]" :page-size="tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
      </el-pagination>
    </div>
  </imp-panel>
</template>

<script>
import ImpPanel from '@/components/ImpPanel'
import df from 'dateformat-util'
import { getToken } from '@/utils/auth'
import { list, remove } from '@/api/med/upload'

export default {
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    return {
      uploadHeaders: { authUid: getToken() },
      uploadAction: process.env.BASE_API + '/med/coder/upload',
      searchKey: '',
      listLoading: false,
      tableData: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: []
      }
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.$router.push({
        path: 'mapping',
        query: { uploadId: response.data.uploadId }
      })
    },
    dateFmt(row, column, cellValue) {
      return cellValue
        ? df.format(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
        : ''
    },
    handleEdit(index, row) {
      this.$router.push({ path: 'mapping', query: { uploadId: row.uploadId }})
    },
    handleDelete(index, row) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(this.uploadId).then(res => { this.loadData() })
      })
    },
    handleSizeChange(val) {
      this.tableData.pageSize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val
      this.loadData()
    },
    loadData() {
      list(this.searchKey, this.tableData.currentPage, this.tableData.pageSize).then(res => {
        this.tableData.rows = res.data.rows
        this.tableData.total = res.data.total
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>
