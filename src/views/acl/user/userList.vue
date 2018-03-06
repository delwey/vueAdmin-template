<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="8">
          <router-link :to="{ path: 'userAdd'}">
            <el-button type="primary" icon="plus">新增</el-button>
          </router-link>
        </el-col>
        <el-col :span="16">
          <div class="el-input" style="width: 200px; float: right;">
            <!-- <i class="el-input__icon el-icon-search"></i> -->
            <el-input
              placeholder="输入用户名称或email"
              prefix-icon="el-icon-search"
              @keyup.enter="search($event)"
              v-model="searchKey">
            </el-input>
            <!-- <input type="text" placeholder="输入用户名称或email" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner"> -->
          </div>
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table :data="tableData.rows" stripe border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
        <el-table-column prop="userId" type="selection" width="45"></el-table-column>
        <el-table-column prop="email" label="登录邮箱">
        </el-table-column>
        <el-table-column prop="name" label="用户名称">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="sexFormatter">
        </el-table-column>
        <el-table-column prop="status" label="状态" :formatter="statusFormatter">
        </el-table-column>
        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <el-button size="small" type="default" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="small" type="info" icon="setting" @click="showRoles(scope.$index, scope.row)">配置角色
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.currentPage" :page-sizes="[5, 10, 20]" :page-size="tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
      </el-pagination>

      <el-dialog title="配置角色" :visible.sync="dialogVisible">
        <div class="select-tree">
          <el-scrollbar tag="div" class='is-empty' wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list">
            <el-tree ref="roleTree" :data="roleTree" show-checkbox check-strictly node-key="roleId" v-loading="dialogLoading" :default-expanded-keys="expKeys" :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRoles">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </imp-panel>
</template>

<script>
import ImpPanel from '@/components/ImpPanel'
import { list, remove, getRoles, saveRoles } from '@/api/acl/user'
import { getTree as getRoleTree } from '@/api/acl/role'
import ElAlert from 'element-ui/packages/alert/src/main.vue'

export default {
  components: {
    ElAlert,
    'imp-panel': ImpPanel
  },
  data() {
    return {
      currentRow: {},
      dialogVisible: false,
      dialogLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        userId: 'userId'
      },
      roleTree: [],
      expKeys: [],
      listLoading: false,
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
    search(target) {
      this.loadData()
    },
    handleSelectionChange(val) {},
    sexFormatter(row, column, cellValue) {
      return cellValue === 1 ? '男' : '女'
    },
    statusFormatter(row, column, cellValue) {
      return cellValue === 0 ? '正常' : '挂起'
    },
    showRoles(index, row) {
      this.currentRow = row
      this.dialogVisible = true
      if (this.roleTree.length <= 0) {
        getRoleTree().then(res => { this.roleTree = res.data })
      }
      getRoles(row.userId).then(res => {
        this.$refs.roleTree.setCheckedKeys(res.data)
        this.expKeys = res.data
      })
    },
    saveRoles() {
      const checkedKeys = this.$refs.roleTree.getCheckedKeys()
      saveRoles(this.currentRow.userId, checkedKeys.join(',')).then(res => {
        this.$message(res.data.msg)
        this.dialogVisible = false
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
    handleEdit(index, row) {
      console.log('rowuserId=>', row.userId)
      this.$router.push({ path: 'userAdd', query: { userId: row.userId }})
    },
    handleDelete(index, row) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(row.userId).then(res => { this.loadData() })
      })
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

<style>
.el-pagination {
  float: right;
  margin-top: 15px;
}
</style>
