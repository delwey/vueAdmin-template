<template>
  <imp-panel title="数据查询">
    <div slot="header">
      <el-form :inline="true" ref="form" :model="form" label-width="80px;">
        <el-form-item label="上传批次">
          <el-select v-model="form.uploadId">
            <el-option v-for="item in uploadItems" :key="item.uploadId" :label="item.uploadNo" :value="item.uploadId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="核查信息">
          <el-select v-model="form.ruleId">
            <el-option v-for="item in ruleItems" :key="item.ruleId" :label="item.ruleDesc" :value="item.ruleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker v-model="form.dates" type="daterange" range-separator="~" placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查 询</el-button>
          <el-button type="primary" @click="onDownload">导 出</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div slot="body">
      <el-table :data="tableData.rows" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="recordNo" label="病案号" width="160">
        </el-table-column>
        <el-table-column prop="hosName" label="医院名称" width="120">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="sexFmt">
        </el-table-column>
        <el-table-column prop="dobDate" label="出生日期" width="120" :formatter="dateFmt">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="70">
        </el-table-column>
        <el-table-column prop="newBornWt" label="新生儿出生体重" width="150">
        </el-table-column>
        <el-table-column prop="newBornAdmWt" label="新生儿入院体重" width="150">
        </el-table-column>
        <el-table-column prop="marryAge" label="婚姻" width="120" :formatter="marryFmt">
        </el-table-column>
        <el-table-column prop="admSpec" label="入院科别" width="120">
        </el-table-column>
        <el-table-column prop="dischgSpec" label="出院科别" width="120">
        </el-table-column>
        <el-table-column prop="admDate" label="入院日期" width="120" :formatter="dateFmt">
        </el-table-column>
        <el-table-column prop="dischgDate" label="出院日期" width="120" :formatter="dateFmt">
        </el-table-column>
        <el-table-column prop="dxOutDesc" label="门诊诊断描述" width="150">
        </el-table-column>
        <el-table-column prop="dxOut" label="门诊疾病编码" width="150">
        </el-table-column>
        <el-table-column prop="dxPathDesc" label="病理诊断描述" width="150">
        </el-table-column>
        <el-table-column prop="dxPath" label="病理诊断编码" width="150">
        </el-table-column>
        <el-table-column prop="dxMstDesc" label="出院诊断" width="150">
        </el-table-column>
        <el-table-column prop="dxMst" label="疾病编码" width="120">
        </el-table-column>

        <el-table-column prop="totalFee" label="总费用" width="120">
        </el-table-column>
        <el-table-column prop="copayFee" label="自付金额" width="120">
        </el-table-column>
        <el-table-column prop="genrMcFee" label="一般医疗服务费" width="150">
        </el-table-column>
        <el-table-column prop="nursFee" label="护理费">
        </el-table-column>
        <el-table-column prop="mcsvrOtherFee" label="医疗服务其他费" width="150">
        </el-table-column>
        <el-table-column prop="dxPathFee" label="病理诊断费" width="120">
        </el-table-column>
        <el-table-column prop="labFee" label="实验室诊断费" width="150">
        </el-table-column>
        <el-table-column prop="imgFee" label="影像学诊断费" width="150">
        </el-table-column>
        <el-table-column prop="clnclFee" label="临床诊断项目费" width="150">
        </el-table-column>
        <el-table-column prop="notProcFee" label="非手术治疗项目费" width="150">
        </el-table-column>
        <el-table-column prop="physclFee" label="临床物理治疗费" width="150">
        </el-table-column>
        <el-table-column prop="procFee" label="手术治疗费" width="150">
        </el-table-column>
        <el-table-column prop="anesFee" label="麻醉费" width="120">
        </el-table-column>
        <el-table-column prop="surgFee" label="手术费" width="120">
        </el-table-column>
        <el-table-column prop="recvryFee" label="康复费" width="120">
        </el-table-column>
        <el-table-column prop="cnMcFee" label="中医治疗费" width="120">
        </el-table-column>
        <el-table-column prop="westmFee" label="西药费" width="120">
        </el-table-column>
        <el-table-column prop="antibioFee" label="抗菌药物费" width="150">
        </el-table-column>
        <el-table-column prop="cnMfee" label="中成药费" width="120">
        </el-table-column>
        <el-table-column prop="cnHerbalFee" label="中草药费" width="120">
        </el-table-column>
        <el-table-column prop="bloodFee" label="血费" width="120">
        </el-table-column>
        <el-table-column prop="albuminFee" label="白蛋白费" width="120">
        </el-table-column>
        <el-table-column prop="globulinFee" label="球蛋白费" width="120">
        </el-table-column>
        <el-table-column prop="coagulFee" label="凝血因子费" width="120">
        </el-table-column>
        <el-table-column prop="cellFee" label="细胞因子费" width="120">
        </el-table-column>
        <el-table-column prop="chkMtrFee" label="检查材料费" width="120">
        </el-table-column>
        <el-table-column prop="tmMtrFee" label="治疗材料费" width="120">
        </el-table-column>
        <el-table-column prop="procMtrFee" label="手术材料费" width="120">
        </el-table-column>
        <el-table-column prop="otherFee" label="其他费" width="120">
        </el-table-column>
        <el-table-column prop="genrOptFee" label="治疗操作费" width="150">
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button size="small" type="default" icon="edit" @click="handleEdit(scope.$index, scope.row)">详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="tableData.currentPage" :page-sizes="[5, 10, 20]" :page-size="tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
      </el-pagination>
    </div>
  </imp-panel>
</template>

<script>
import ImpPanel from '@/components/ImpPanel'
import df from 'dateformat-util'
import { download, list, uploadList, ruleList } from '@/api/med/data'

export default {
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    return {
      form: {
        uploadId: '',
        ruleId: '',
        dates: []
      },
      uploadItems: [],
      ruleItems: [],
      searchKey: '',
      tableData: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: []
      }
    }
  },
  methods: {
    onSubmit() {
      this.loadData()
    },
    onDownload() {
      download().then(res => {
        const blob = new Blob(['\uFEFF' + res.data], {
          type: 'text/csv;charset=utf-8;'
        })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'test.csv'
        link.click()
      })
    },
    handleEdit(index, row) {
      this.$router.push({ path: 'detail', query: { recordId: row.recordId }})
    },
    handleSelectionChange(val) {},
    handleSizeChange(val) {
      this.tableData.pageSize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val
      this.loadData()
    },
    dateFmt(row, column, cellValue) {
      return cellValue ? df.format(new Date(cellValue), 'yyyy-MM-dd') : ''
    },
    marryFmt(row, column, cellValue) {
      return cellValue === 2 ? '已婚' : '未婚'
    },
    sexFmt(row, column, cellValue) {
      return cellValue === 1 ? '男' : '女'
    },
    loadData() {
      const param = {
        uploadId: this.form.uploadId,
        ruleId: this.form.ruleId,
        dates: this.form.dates,
        pageSize: this.tableData.pageSize,
        currentPage: this.tableData.currentPage
      }
      console.log('param =>', param)
      list(param).then(res => {
        this.tableData.rows = res.data.rows
        this.tableData.total = res.data.total
      })
      uploadList().then(res => {
        this.uploadItems = res.data
      })
      ruleList(this.form.uploadId).then(res => {
        this.ruleItems = res.data
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>
<style>
.tr-padding {
  padding-left: 5px;
  padding-right: 50px;
}
</style>
