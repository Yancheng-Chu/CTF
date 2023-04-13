<!-- /*
 * @Author: yancheng chu
 * @Date: 2023-03-13 01:30:00
 * @LastEditors: yancheng chu
 * @LastEditTime: 2023-04-13 03:00:00
 * @Path: https://github.com/Yancheng-Chu/
 * @Description:CTF
 */ -->
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
          <van-field style="" v-model="username" name="UserName" label="UserName" placeholder="UserName"
            :rules="[{ required: true, message: 'Please Enter UserName' }]" />
          <van-field style="margin-bottom: 20px;" v-model="code" name="2rf" label="Verification"
            placeholder="Enter Verification Code"
            :rules="[{ required: true, message: 'Please Enter Verification Code' }]" />

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
          <van-button @click="onSign" disabled round block style="font-size: 18px; height: 32px;
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
      code: ref(''),
      username: ref(''),
      password: ref(''),
      title: 'Login',
      pas: ''
    }
  },
  methods: {
    onSign() {
      if (this.title != 'Sign') {
        this.title = 'Sign'
      } else {
        // console.log('sign', values);
        if (this.username != '' && this.password != '') {
          axios.post("http://localhost:1919/ctf/signup", {
            account: this.username,
            password: this.password
          }).then(res => {
            // console.log(res)
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
      //flag2
      if (this.title != 'Forgot') {
        this.title = 'Forgot'
      } else {
        if (this.username != '') {
          if (this.username == 'root') {
            showFailToast('You are not the Root');
          }
          else if (this.username == 'Ray') {
            showFailToast('Need Correct Verification Code');
          }
          else {
            let url = "http://localhost:1919/ctf/getUser" + "?account=" + this.username
            axios.get(url, {
            }).then(res => {
              if (res.data != '') {
                showSuccessToast('Find the password success');
                this.pas = res.data.password
                // console.log(res)
              }
            }).catch(err => {
              showFailToast('Username is not exist');
              console.log(err)
            })
          }
        } else {
          showFailToast('Please Enter Account and Password');
        }
      }

    },
    onLogin() {
      this.title = 'Login'
      sessionStorage.setItem('user', this.username);
      if (this.username !== 'root') {
        axios.post("http://localhost:1919/ctf/login", {
          account: this.username,
          password: this.password
        }).then(res => {
          if (res.data.length != 0) {
            this.$router.push('/profile');
          }
          // console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        //flag8
        var userAgent = navigator.userAgent;
        var isEdge = userAgent.indexOf("Edg") > -1;
        var isChrome = userAgent.indexOf("Chrome") > -1 && !userAgent.indexOf("Safari") > -1 && !isEdge;
        if (!isChrome) {
          alert('Browser is not allowed');
        }
        else {
          fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
              // console.log(data.ip)
              if (data.ip !== '192.168.1.1') {
              // if (data.ip !== '24.126.14.231') {
                alert("IP is not allowed");
                // this.$router.push('/root');
              } else {
                axios.post("http://localhost:1919/ctf/login", {
                  account: this.username,
                  password: this.password
                }).then(res => {
                  if (res.data.length != 0) {
                    this.$router.push('/profile');
                  }
                  // console.log(res)
                }).catch(err => {
                  console.log(err)
                })
              }
            });
        }
      }
    },
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
  