<template>
  <imp-panel title="数据详情">
    <div slot="header">
      <el-button @click="cancelClick">返 回</el-button>
      <!--<el-button type="primary" @click="saveClick">保 存</el-button>-->
    </div>

    <div slot="body">
      <el-tabs v-model="activeName" type="border-card" @tab-click="tabClick">
        <el-tab-pane label="基本信息" name="first">
          <table border="0" width="100%">
            <tr>
              <td class="td1">医院名称</td>
              <td class="td2">
                <el-input v-model="form.hosName"></el-input>
              </td>
              <td class="td1">病案号</td>
              <td class="td2">
                <el-input v-model="form.recordNo"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">出生日期</td>
              <td class="td2">
                <el-date-picker v-model="form.dobDate" type="date" placeholder="出生日期">
                </el-date-picker>
              </td>
              <td class="td1">性别</td>
              <td class="td2">
                <el-input v-model="form.sex"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">年龄</td>
              <td class="td2">
                <el-input v-model="form.age"></el-input>
              </td>
              <td class="td1">婚姻</td>
              <td class="td2">
                <el-input v-model="form.marryAge"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">新生儿出生体重(克)</td>
              <td class="td2">
                <el-input v-model="form.newBornWt"></el-input>
              </td>
              <td class="td1">新生儿入院体重(克）</td>
              <td class="td2">
                <el-input v-model="form.newBornAdmWt"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">入院科别</td>
              <td class="td2">
                <el-input v-model="form.admSpec"></el-input>
              </td>
              <td class="td1">出院科别</td>
              <td class="td2">
                <el-input v-model="form.dischgSpec"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">入院日期</td>
              <td class="td2">
                <el-date-picker v-model="form.admDate" type="date" placeholder="入院日期">
                </el-date-picker>
              </td>
              <td class="td1">出院日期</td>
              <td class="td2">
                <el-date-picker v-model="form.dischgDate" type="date" placeholder="入院日期">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <td class="td1">门诊诊断描述</td>
              <td class="td2">
                <el-input v-model="form.dxOutDesc"></el-input>
              </td>
              <td class="td1">门诊疾病编码</td>
              <td class="td2">
                <el-input v-model="form.dxOut"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">病理诊断描述</td>
              <td class="td2">
                <el-input v-model="form.dxPathDesc"></el-input>
              </td>
              <td class="td1">病理诊断编码</td>
              <td class="td2">
                <el-input v-model="form.dxPath"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">出院诊断</td>
              <td class="td2">
                <el-input v-model="form.dxMstDesc"></el-input>
              </td>
              <td class="td1">疾病编码</td>
              <td class="td2">
                <el-input v-model="form.dxMst"></el-input>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="出院诊断" name="second">
          <el-table :data="dxDatas" border style="width: 100%">
            <el-table-column prop="dxNo" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="dxDesc" label="其他诊断" width="300">
            </el-table-column>
            <el-table-column prop="dx" label="疾病编码" width="300">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="手术及操作" name="third">
          <el-table :data="procDatas" border style="width: 100%">
            <el-table-column prop="procNo" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="procDesc" label="手术及操作名称" width="300">
            </el-table-column>
            <el-table-column prop="proc" label="手术及操作编码" width="300">
            </el-table-column>
            <el-table-column prop="procDate" label="手术日期" width="300" :formatter="dateFmt">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="费用信息" name="fourth">
          <table border="0" width="100%">
            <tr>
              <td class="td1">总费用</td>
              <td class="td2">
                <el-input v-model="form.totalFee"></el-input>
              </td>
              <td class="td1">自付金额</td>
              <td class="td2">
                <el-input v-model="form.copayFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">一般医疗服务费</td>
              <td class="td2">
                <el-input v-model="form.genrMcFee"></el-input>
              </td>
              <td class="td1">护理费</td>
              <td class="td2">
                <el-input v-model="form.nursFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">一般治疗操作费</td>
              <td class="td2">
                <el-input v-model="form.genrOptFee"></el-input>
              </td>
              <td class="td1">病理诊断费</td>
              <td class="td2">
                <el-input v-model="form.dxPathFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">其他费用</td>
              <td class="td2">
                <el-input v-model="form.mcsvrOtherFee"></el-input>
              </td>
              <td class="td1">影像学诊断费</td>
              <td class="td2">
                <el-input v-model="form.imgFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">实验室诊断费</td>
              <td class="td2">
                <el-input v-model="form.labFee"></el-input>
              </td>
              <td class="td1">临床诊断项目费</td>
              <td class="td2">
                <el-input v-model="form.clnclFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">非手术治疗项目费</td>
              <td class="td2">
                <el-input v-model="form.notProcFee"></el-input>
              </td>
              <td class="td1">临床物理治疗费</td>
              <td class="td2">
                <el-input v-model="form.physclFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">手术治疗费</td>
              <td class="td2">
                <el-input v-model="form.procFee"></el-input>
              </td>
              <td class="td1">麻醉费</td>
              <td class="td2">
                <el-input v-model="form.anesFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">手术费</td>
              <td class="td2">
                <el-input v-model="form.surgFee"></el-input>
              </td>
              <td class="td1">康复费</td>
              <td class="td2">
                <el-input v-model="form.recvryFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">中医治疗费</td>
              <td class="td2">
                <el-input v-model="form.cnMcFee"></el-input>
              </td>
              <td class="td1">西药费</td>
              <td class="td2">
                <el-input v-model="form.westmFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">抗菌药物费</td>
              <td class="td2">
                <el-input v-model="form.antibioFee"></el-input>
              </td>
              <td class="td1">中成药费</td>
              <td class="td2">
                <el-input v-model="form.cnMfee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">中草药费</td>
              <td class="td2">
                <el-input v-model="form.cnHerbalFee"></el-input>
              </td>
              <td class="td1">血费</td>
              <td class="td2">
                <el-input v-model="form.bloodFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">白蛋白类制品费</td>
              <td class="td2">
                <el-input v-model="form.albuminFee"></el-input>
              </td>
              <td class="td1">球蛋白类制品费</td>
              <td class="td2">
                <el-input v-model="form.globulinFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">凝血因子类制品费</td>
              <td class="td2">
                <el-input v-model="form.coagulFee"></el-input>
              </td>
              <td class="td1">细胞因子类制品费</td>
              <td class="td2">
                <el-input v-model="form.cellFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">检查用一次性医用材料费</td>
              <td class="td2">
                <el-input v-model="form.chkMtrFee"></el-input>
              </td>
              <td class="td1">治疗用一次性医用材料费</td>
              <td class="td2">
                <el-input v-model="form.tmMtrFee"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">手术用一次性医用材料费</td>
              <td class="td2">
                <el-input v-model="form.procMtrFee"></el-input>
              </td>
              <td class="td1">其他费</td>
              <td class="td2">
                <el-input v-model="form.otherFee"></el-input>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </imp-panel>

</template>

<script>
import ImpPanel from '@/components/ImpPanel'
import df from 'dateformat-util'
import { update, detail, dxDatas, procDatas } from '@/api/med/data'

export default {
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    return {
      activeName: 'first',
      form: {
        recordId: '记录Id',
        uploadId: '上传Id',
        recordNo: '病案号',
        hosName: '医院名称',
        sex: '性别',
        dobDate: '出生日期',
        age: '年龄',
        newBornWt: '新生儿出生体重',
        newBornAdmWt: '新生儿入院体重',
        marryAge: '婚姻',
        admSpec: '入院科别',
        dischgSpec: '出院科别',
        admDate: '入院日期',
        dischgDate: '出院日期',
        dxOutDesc: '门诊诊断描述',
        dxOut: '门诊疾病编码',
        dxPathDesc: '病理诊断描述',
        dxPath: '病理诊断编码',
        dxMstDesc: '出院诊断',
        dxMst: '疾病编码',

        totalFee: '住院费用(元)：总费用',
        copayFee: '自付金额',
        genrMcFee: '综合医疗服务类：(1)一般医疗服务费',
        nursFee: '综合医疗服务类：(3)护理费',
        mcsvrOtherFee: '综合医疗服务类：(4)其他费用',
        dxPathFee: '诊断类：(5)病理诊断费',
        labFee: '诊断类：(6)实验室诊断费',
        imgFee: '诊断类：(7)影像学诊断费',
        clnclFee: '诊断类：(8)临床诊断项目费',
        notProcFee: '治疗类：(9)非手术治疗项目费',
        physclFee: '临床物理治疗费',
        procFee: '治疗类：(10)手术治疗费',
        anesFee: '麻醉费',
        surgFee: '手术费',
        recvryFee: '康复类：(11)康复费',
        cnMcFee: '中医类:(12)中医治疗费',
        westmFee: '西药类:(13)西药费',
        antibioFee: '抗菌药物费z',
        cnMfee: '中药类:(14)中成药费',
        cnHerbalFee: '中药类:(15)中草药费',
        bloodFee: '血液和血液制品类:(16)血费',
        albuminFee: '血液和血液制品类:(17)白蛋白类制品费',
        globulinFee: '血液和血液制品类:(18)球蛋白类制品费',
        coagulFee: '血液和血液制品类:(19)凝血因子类制品费',
        cellFee: '血液和血液制品类:(20)细胞因子类制品费',
        chkMtrFee: '耗材类:(21)检查用一次性医用材料费',
        tmMtrFee: '耗材类:(22)治疗用一次性医用材料费',
        procMtrFee: '耗材类:(23)手术用一次性医用材料费',
        otherFee: '其他类：(24)其他费',
        genrOptFee: '综合医疗服务类：(2)一般治疗操作费'
      },
      searchKey: '',
      dialogTableVisible: true,
      dxDatas: [],
      procDatas: []
    }
  },
  methods: {
    cancelClick() {
      this.$router.push({ path: 'data' })
    },
    dateFmt(row, column, cellValue) {
      return cellValue ? df.format(new Date(cellValue), 'yyyy-MM-dd') : ''
    },
    sexFmt(value) {
      return value === 1 ? '男' : '女'
    },
    saveClick() {
      update(this.form).then(res => { })
    },
    tabClick(tab, event) {
      // console.log(tab, event);
    },
    loadData() {
      detail(this.$route.query.recordId).then(res => {
        this.form = res.data
        this.form.sex = this.sexFmt(this.form.sex)
        this.form.marryAge = this.form.marryAge === 2 ? '已婚' : '未婚'
      })
      dxDatas(this.$route.query.recordId).then(res => {
        this.dxDatas = res.data
      })
      procDatas(this.$route.query.recordId).then(res => {
        this.procDatas = res.data
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style>
.td1 {
  background-color: #f5f5f5;
  padding-left: 10px;
  padding-right: 10px;
  width: 200px;
}
.td2 {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
