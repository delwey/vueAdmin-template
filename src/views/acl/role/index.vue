<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <!--<el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>-->
    </h3>
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="roleTree" :data="roleTree" ref="roleTree" highlight-current :render-content="renderContent" @node-click="handleNodeClick" clearable node-key="roleId" :props="defaultProps"></el-tree>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <el-select v-model="form.parentId" placeholder="请从左侧树选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="英文" :label-width="formLabelWidth">
                <el-input v-model="form.enName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否生效" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.usable" label="1">是</el-radio>
                <el-radio class="radio" v-model="form.usable" label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-slider v-model="form.sort"></el-slider>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.remarks" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="isUpdate?'修改':'新增'"></el-button>
                <el-button type="info" @click="showResources($event,form.roleId)" icon="setting" v-show="isUpdate">配置资源</el-button>
                <el-button type="danger" @click="deleteSelected" icon="delete" v-show="isUpdate">删除
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-dialog title="配置资源" :visible.sync="dialogVisible">
          <div class="select-tree">
            <el-scrollbar tag="div" class='is-empty' wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list">
              <el-tree :data="resourceTree" ref="resourceTree" show-checkbox check-strictly node-key="resourceId" v-loading="dialogLoading" :default-expanded-keys="expKeys" :props="defaultProps">
              </el-tree>
            </el-scrollbar>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveResources">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script>
import { getTree, add, update, remove, getResources, saveResources } from '@/api/acl/role'
import { getTree as resourceTree } from '@/api/acl/resource'
import ImpPanel from '@/components/ImpPanel'
import treeter from '@/utils/treeter'

export default {
  mixins: [treeter],
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    return {
      dialogLoading: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'roleId'
      },
      roleTree: [],
      resourceTree: [],
      expKeys: [],
      maxId: 700000,
      isUpdate: false, // false: add, true: update
      selectedNode: null,
      options: [
        {
          value: '0000',
          label: '角色'
        }
      ],
      form: {
        roleId: null,
        parentId: null,
        name: '',
        enName: '',
        sort: 0,
        usable: '1',
        delFlag: 0
      }
    }
  },
  methods: {
    handleNodeClick(data, node) {
      this.selectedNode = data
      this.options.splice(0, 1, {
        value: node.parent.key,
        label: node.parent.label
      }) // 替换当前选项
      this.isUpdate = true
      this.$refs['form'].resetFields()
      this.form = data
    },
    newAdd() {
      this.isUpdate = false
      this.options.splice(0, 1, {
        value: this.selectedNode.roleId,
        label: this.selectedNode.name
      }) // 替换当前选项
      this.form = {
        roleId: null,
        parentId: this.selectedNode.roleId,
        name: '',
        enName: '',
        sort: 0,
        usable: '1',
        remarks: ''
      }
    },
    initRoot() {
      this.isUpdate = false
      this.options.splice(0, 1, { value: '0000', label: '角色' }) // 替换当前选项
      this.form = {
        roleId: null,
        parentId: '0000',
        name: '',
        enName: '',
        sort: 0,
        usable: '1',
        remarks: ''
      }
    },
    batchDelete() {
      var checkKeys = this.$refs.roleTree.getCheckedKeys()
      if (checkKeys == null || checkKeys.length <= 0) {
        this.$message.warning('请选择要删除的资源')
        return
      }
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(checkKeys.join(',')).then(res => { this.loadData() })
        this.batchDeleteFromTree(this.roleTree, checkKeys)
      })
    },
    onSubmit() {
      if (this.isUpdate) {
        update(this.form).then(res => {
          this.updateTreeNode(this.roleTree, res.data, 'roleId')
        })
      } else {
        add(this.form).then(res => {
          this.appendTreeNode(this.roleTree, res.data, 'roleId', 'parentId')
        })
      }
    },
    deleteSelected(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(this.form.roleId).then(res => {
          this.deleteFromTree(this.roleTree, this.form.roleId, 'roleId')
          this.initRoot()
        })
      })
    },
    loadData() {
      getTree().then(res => {
        this.roleTree = []
        this.roleTree.push(...res.data)
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
        </span>
      )
    },
    saveResources() {
      const checkedKeys = this.$refs.resourceTree.getCheckedKeys()
      saveResources(this.form.roleId, checkedKeys.join(',')).then(res => {
        this.dialogVisible = false
      })
    },
    showResources(event, id) {
      event.stopPropagation()
      this.dialogVisible = true
      if (this.resourceTree == null || this.resourceTree.length <= 0) {
        this.dialogLoading = true
        resourceTree().then(res => {
          this.dialogLoading = false
          this.resourceTree = res.data
        })
      }
      getResources(id).then(res => {
        this.$refs.resourceTree.setCheckedKeys(res.data)
        this.expKeys = res.data
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style>
.render-content {
  float: right;
  margin-right: 20px;
}

.render-content i.fa {
  margin-left: 10px;
}

.render-content i.fa:hover {
  color: #e6000f;
}

.select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
  padding: 0;
}

.select-tree .el-scrollbar {
  border: 1px solid #d1dbe5;
}

.select-tree .el-tree {
  border: 0;
}
</style>
