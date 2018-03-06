<template>
  <imp-panel :title="form.userId ? '编辑用户':'新增用户'">
    <el-form :model="form" :rules="rules2" ref="form" label-width="180px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入登录邮箱" auto-complete="off" autofocus></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入用户名称" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">挂起</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="form.userType">
          <el-radio label="1">后台配置用户</el-radio>
          <el-radio label="2">网上注册用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-tree v-if="organizeTree" ref="organizeTree" :data="organizeTree" highlight-current clearable :current-node-key="currentNodeKey" :default-expanded-keys="defaultKeys" @node-click="handleNodeClick" node-key="orgId" :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="onEditSubmit" v-if="form.userId">保存</el-button>
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
        <el-button type="warning" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </imp-panel>
</template>

<script>
import ImpPanel from '@/components/ImpPanel'
import { add, update, getById } from '@/api/acl/user'

export default {
  components: {
    'imp-panel': ImpPanel
  },
  data() {
    var validatePass = (rules, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      form: {
        userId: '',
        email: '',
        password: '',
        checkPass: '',
        name: '',
        mobile: '',
        sex: 1,
        phone: '',
        status: 0,
        userType: '1',
        orgId: ''
      },
      currentNodeKey: '',
      selectedNode: null,
      defaultKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'orgId'
      },
      organizeTree: [],
      rules2: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: 'email格式错误', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '密码长度必须是3-8位', trigger: 'change' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleNodeClick(data, node) {
      this.form.orgId = data.orgId
      console.log('this.form.orgId', this.form.orgId)
    },
    onSubmit() {
      add(this.form).then(res => { this.$router.push({ path: 'userList' }) })
    },
    onEditSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          update(this.form).then(res => { this.$router.push({ path: 'userList' }) })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: 'userList' })
    },
    loadData() {
      if (
        this.$route.query &&
        this.$route.query != null &&
        this.$route.query.userId &&
        this.$route.query.userId != null
      ) {
        this.form.userId = this.$route.query.userId
        getById(this.form.userId).then(res => {
          this.form = res.data
          this.form.checkPass = res.data.password
          this.currentNodeKey = this.form.orgId
          this.defaultKeys = [this.form.orgId]
          console.log('orgId:', this.form.orgId)
        })
        // this.$http
        //   .get(api.SYS_ORGANIZE_TREE)
        //   .then(res => {
        //     this.organizeTree = []
        //     this.organizeTree.push(...res.data)
        //   })
      }
    }
  },
  created() {
    this.loadData()
  }
}
</script>
