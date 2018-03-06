<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <!--<el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>-->
    </h3>

    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-card class="box-card">
          <el-tree v-if="organizeTree"
                  ref="organizeTree"
                  :data="organizeTree"
                  highlight-current
                  clearable
                  :render-content="renderContent"
                  @node-click="handleNodeClick"
                  node-key="orgId"
                  :props="defaultProps">
          </el-tree>
        </el-card>
      </el-col>

      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <el-select v-model="form.parentId" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地区" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.admLevel" :label=1>省级医院</el-radio>
                <el-radio class="radio" v-model="form.admLevel" :label=2>市级医院</el-radio>
                <el-radio class="radio" v-model="form.admLevel" :label=3>县级医院</el-radio>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="form.clazz">
                  <el-option
                    v-for="item in typeItems"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="等级1" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.level1" :label=3>三级</el-radio>
                <el-radio class="radio" v-model="form.level1" :label=2>二级</el-radio>
              </el-form-item>
              <el-form-item label="等级2" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.level2" :label=1>甲等</el-radio>
                <el-radio class="radio" v-model="form.level2" :label=2>乙等</el-radio>
                <el-radio class="radio" v-model="form.level2" :label=3>丙等</el-radio>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="isUpdate?'修改':'新增'"></el-button>
                <el-button type="danger" @click="deleteSelected" icon="delete" v-show="isUpdate">删除</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script type="text/babel">
import { getTree, typeList, add, update, remove } from '@/api/acl/organize'
import ImpPanel from '@/components/ImpPanel'
import merge from 'element-ui/src/utils/merge'
import treeter from '@/utils/treeter'

export default {
  mixins: [treeter],
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    return {
      formLabelWidth: '100px',
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'orgId'
      },
      maxId: 7000000,
      organizeTree: [],
      // false: add, true: update
      isUpdate: false,
      selectedNode: null,
      options: [
        {
          value: '0000',
          label: '机构'
        }
      ],
      form: {
        orgId: null,
        name: '',
        admLevel: 1,
        clazz: '',
        level1: '',
        level2: '',
        parentId: null
      },
      typeItems: [],
      rules: {
        name: [{ required: true, message: '请输入机构名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>
              <i class={data.icon} />&nbsp;{node.label}
            </span>
          </span>
        </span>
      )
    },
    newAdd() {
      this.isUpdate = false
      this.options.splice(0, 1, {
        value: this.selectedNode.orgId,
        label: this.selectedNode.name
      }) // 替换当前选项
      this.form = {
        orgId: null,
        name: '',
        admLevel: 1,
        clazz: '',
        level1: '',
        level2: '',
        parentId: this.selectedNode.orgId
      }
    },
    initRoot() {
      this.isUpdate = false
      this.options.splice(0, 1, { value: '0000', label: '机构' }) // 替换当前选项
      this.form = {
        orgId: null,
        name: '',
        admLevel: 1,
        clazz: '',
        level1: '',
        level2: '',
        parentId: '0000'
      }
    },
    handleNodeClick(data, node) {
      this.selectedNode = data
      this.options.splice(0, 1, {
        value: node.parent.key,
        label: node.parent.label
      }) // 替换当前选项
      this.isUpdate = true
      this.$refs['form'].resetFields()
      this.form = merge({}, data)
    },
    deleteSelected() {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(this.form.orgId).then(res => {
          this.deleteFromTree(this.organizeTree, this.form.orgId, 'orgId')
          this.initRoot()
        })
      })
    },
    onSubmit() {
      if (this.isUpdate) {
        update(this.form).then(res => {
          this.updateTreeNode(this.organizeTree, res.data, 'orgId')
        })
      } else {
        add(this.form).then(res => {
          this.appendTreeNode(this.organizeTree, res.data, 'orgId', 'parentId')
        })
      }
    },
    loadData() {
      getTree().then(res => {
        this.organizeTree = []
        this.organizeTree.push(...res.data)
      })
      typeList().then(res => {
        this.typeItems = res.data
      })
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style>
.select-tree .icons-wrapper {
  display: block;
}

.select-tree .is-empty i {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.select-tree .is-empty i:hover {
  background-color: #0d6aad;
  color: #ffffff;
}
</style>
