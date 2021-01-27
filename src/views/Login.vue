<template>
  <div class="formWrapper">
    <h1>后台管理系统</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="left">
      <el-form-item label="用户名" prop="pass" label-width="55px">
        <el-input type="password" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass" label-width="50px">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="commitButton" style="margin-left: 0">
        <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import router from '../router'

export default {
  data () {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    let validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        age: [
          {validator: checkAge, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          alert('submit!')
          router.push('/layout')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.formWrapper {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  h1 {
    margin-top: 180px;
    margin-bottom: 30px;
  }
}

</style>
