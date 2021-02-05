<template>
  <div class="formWrapper">
    <h1>后台管理系统</h1>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" class="demo-ruleForm" label-position="left">
      <el-form-item label="用户名" prop="username" label-width="55px">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="50px">
        <el-input v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item class="commitButton" style="margin-left: 0">
        <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {router} from '../router'
import {setToken} from '@/utils/auth'

export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
    }
  },
  methods: {
    submitForm () {
      this.$store.dispatch('login', this.ruleForm)
        .then(data => {
          if (data.info.result === 'success') {
            setToken()
            router.push('/layout')
          }  else {
            throw new Error('请重新输入用户名或密码')
          }
        }).catch(err => {
        this.$message({type: 'info', message: err})
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
