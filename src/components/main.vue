<template>
    <div class="outer">
      <div class="login">{{ title }}</div>
      <div class="frame">
        <van-form class="form">
          <van-cell-group inset v-if="title != 'Forgot'">
            <van-field style="margin-bottom: 20px;" v-model="username" name="UserName" label="UserName"
              placeholder="UserName" :rules="[{ required: true, message: 'Please Enter UserName' }]" />
            <van-field v-model="password" type="password" name="Password" label="Password" placeholder="Password"
              :rules="[{ required: true, message: 'Please Enter PassWord' }]" />
          </van-cell-group>
          <van-cell-group inset v-else>
            <div style="margin-bottom:10px">What's your UserName?</div>
            <van-field style="margin-bottom: 20px;" v-model="username" name="UserName" label="UserName"
              placeholder="UserName" :rules="[{ required: true, message: 'Please Enter UserName' }]" />
            <div v-show="pas != ''" style="margin-bottom:10px">This is your Password:{{ pas }}</div>
          </van-cell-group>
          <div style="display: flex;align-items: center;justify-content: center;">
            <div style="position:absolute;bottom: 60px;">
              <van-button @click="onLogin" round block style="font-size: 18px; height: 32px;">
                Login
              </van-button>
            </div>
          </div>
          <div>
            <van-button @click="onForgot" round block style="font-size: 18px; height: 32px;
                              position:absolute;bottom: 20px;left:20px;width:auto;">
              Forgot
            </van-button>
            <van-button @click="onSign" disabled  round block style="font-size: 18px; height: 32px;
                              position:absolute;bottom: 20px;right:20px;width:auto;">
              Sign
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';
  import axios from "axios";
  import { showSuccessToast, showFailToast } from 'vant';
  
  export default {
    data() {
      return {
        username: ref(''),
        password: ref(''),
        title: 'Login',
        pas: ''
      }
    },
    methods: {
      onSign(values) {
        console.log('11111')
        if (this.title != 'Sign') {
          this.title = 'Sign'
        } else {
          console.log('sign', values);
          if (this.username != '' && this.password != '') {
            axios.post("http://localhost:1919/customer/signup", {
              account: this.username,
              password: this.password
            }).then(res => {
              console.log(res)
              if (res.data != '') {
                showSuccessToast('Create Account Success');
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            showFailToast('Please Enter Account and Password');
          }
        }
      },
      onForgot() {
        if (this.title != 'Forgot') {
          this.title = 'Forgot'
        } else {
          if (this.username != '') {
            let url = "http://localhost:1919/ctf/getUser" + "?account="+this.username
            console.log(url)
            axios.get(url,{
            }).then(res => {
              if (res.data != '') {
                showSuccessToast('Find the password success');
                this.pas = res.data.password
                console.log(res)
              }
            }).catch(err => {
              showFailToast('Username is not exist');
              console.log(err)
            })
          } else {
            showFailToast('Please Enter Account and Password');
          }
        }
  
      },
      onLogin() {
        this.title = 'Login'
        this.$router.push('/profile');
        // axios.post("http://localhost:1919/customer/login",{
  
        // }).then(res =>{
        //   console.log(res)
        // }).catch(err=>{
        //   console.log(err)
        // })
      }
    }
  };
  
  </script>
  
  <style>
  .outer {
    position: relative;
    width: 460px;
    height: 340px;
    border-radius: 15px;
    border: 2px solid #2c3e50;
    margin: 100px auto;
  }
  
  .login {
    font-weight: bold;
    text-align: center;
    font-size: 32px;
    margin-top: 25px;
  }
  
  .frame {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  