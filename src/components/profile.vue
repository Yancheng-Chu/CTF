<!-- /*
 * @Author: yancheng chu
 * @Date: 2023-03-13 01:30:00
 * @LastEditors: yancheng chu
 * @LastEditTime: 2023-04-13 03:00:00
 * @Path: https://github.com/Yancheng-Chu/
 * @Description:CTF
 */ -->
<template>
    <div v-show="checked">
        <div style="display: flex; justify-content: center; align-items: center;margin-top: 200px;">
            <van-cell-group inset>
                <van-field v-model="password" label="Passcode" type="password" placeholder="Please Enter Passcode"
                    style="font-size:40px;" />
            </van-cell-group>
        </div>
        <van-button @click="onCheck" round block style="font-size: 18px; height: 32px;">
            Check
        </van-button>
    </div>
    <div v-show="!checked">
        <div class="pleft">
            <div class="head-img">
                <!-- <img src="../assets/hintisflag5.png" class="flag6" style="width:100%;height:100%" /> -->
                <img src="https://kekkai-1315789628.cos.ap-shanghai.myqcloud.com/resource/ctf/hintisflag5.png" class="flag5"  style="width:100%;height:100%" />
            </div>
            <div class="blog-name">Ray</div>
            <div class="blog-info">I falled in love</div>
            <div class="blog-about">
                <ul type="none">
                    <li><a :href="flag7" download class="flag7" style="font-size: 18px;">About Me</a></li>
                    <li><a :href="flag8" download class="flag8" style="font-size: 18px;">About Him</a></li>
                </ul>
            </div>
        </div>
        <div class="pright">
            <div class="paper-list" v-for="(item, index) in blogs" :key="index">
                <div class="paper">
                    <div class="paper-head">
                        <div class="paper-name">{{ item.name }}</div>
                        <div class="paper-date">{{item.date}}</div>
                    </div>
                    <div class="paper-content">{{ item.context }}
                    </div>
                    <div class="paper-tags">
                        <ul type="none">
                            <li><a :href="flag10" download>{{item.file}}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from "axios";
export default {
    data() {
        return {
            flag7: 'https://kekkai-1315789628.cos.ap-shanghai.myqcloud.com/resource/ctf/flag7',
            flag8: 'https://kekkai-1315789628.cos.ap-shanghai.myqcloud.com/resource/ctf/flag8.exe',
            flag10: 'https://kekkai-1315789628.cos.ap-shanghai.myqcloud.com/resource/ctf/flag10.zip',
            password: '',
            checked: true,
            blogs: [],
            username:''
        }
    },
    created() {
        const value = sessionStorage.getItem('user');
        this.username = value
        let c = value == 'root'
        let url = "http://localhost:1919/ctf/getBlog" + "?show=" + !c
        axios.get(url, {
        }).then(res => {
            if (res.data != '') {
                for (let i of res.data) {
                    let blog = [
                        {
                            'name': '',
                            'date': '',
                            'context': '',
                            'file': ''
                        }
                    ]
                    blog.name = i.name
                    blog.date = i.date
                    blog.context = i.context
                    if (i.file != ''){
                        blog.file = i.file
                    }
                    this.blogs.push(blog)
                }
                // console.log(res)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        onCheck() {
            axios.post("http://localhost:1919/profile", {
                  account: this.username,
                  password: this.password
                }).then(res => {
                  if (res.data == 'Success') {
                    Cookies.set('flag4', '192.168.11.1')
                    this.checked = false
                  }
                  else{
                    alert('2FA is not correct')
                  }
                  // console.log(res)
                }).catch(err => {
                  console.log(err)
                })
        },
    }
}
</script>
   
<style>
.pleft {
    background-color: rgba(125, 125, 125, 0.8);
    width: 20%;
    padding-top: 25px;
    color: white;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 20px 20px 15px 15px;
    position: fixed;
}

.head-img {
    border: 1px solid white;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin: 0 auto;
}

.head-img>img {
    max-width: 100%;
}

.blog-name {
    text-align: center;
    padding: 15px 0;
}

.blog-info {
    text-align: center;
    font-size: 13px;
    padding: 5px;
}

.blog-about,
.blog-tags {
    text-align: center;
    padding: 10px 0;
}

.blog-about a,
.blog-tags a {
    color: #eeeeee;
    font-size: 11px;
}

.blog-about {
    margin-top: 90%;
}

.blog-tags li:before {
    content: "#";
    color: #eeeeee;
    font-size: 10px;
}

/*右侧*/
.pright {
    width: 60%;
    background-color: rgba(238, 237, 237, 0.6);
    float: right;
    margin-top: 10px;
    margin-right: 13%;
    padding: 20px;
}

.paper {
    background-color: white;
    border-radius: 10px 10px 5px 5px;
    margin-bottom: 20px;
}

.paper-head {
    padding: 10px;
}

.paper-head:after {
    content: "";
    clear: both;
    display: block;
}

.paper-name {
    float: left;
    border-left: 2px solid red;
    padding-left: 7px;
}

.paper-name a {
    color: black;
}

.paper-date {
    float: right;
}

.paper-content {
    padding: 15px 20px;
    text-indent: 20px;
    font-size: 17px;
}

.paper-tags {
    border-top: 1px solid #cccccc;
    padding: 5px 10px;
}

.paper-tags li {
    display: inline;
    padding: 0 10px;
}

.paper-tags a {
    color: gray;
}

.paper-tags a:hover {
    color: black;
}
</style>
