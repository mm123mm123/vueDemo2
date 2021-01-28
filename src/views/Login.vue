<template>
  <div class="formWrapper">
    <h1>后台管理系统</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="left">
      <el-form-item label="用户名" prop="username" label-width="55px">
        <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="50px">
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
    let checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {validator: checkUserName, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          const httpRequest = new XMLHttpRequest()
          httpRequest.onreadystatechange = () => {
            try {
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                  if(JSON.parse(httpRequest.response).info.result==='success'){
                    router.push('/layout')
                  }
                } else {
                  alert('There was a problem with the request.');
                }
              }
            }
            catch( e ) {
              alert('Caught Exception: ' + e.description);
            }
          }
          httpRequest.open('POST','http://localhost:8080/api/login/auth')
          httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          httpRequest.send(JSON.stringify(this.ruleForm));
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
