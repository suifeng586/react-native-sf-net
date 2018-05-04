/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    NetInfo
} from 'react-native';

var base_url = ''

class SFNet extends React.Component{

    /*
     *域名配置
     *
     **/
    static config = (address) => {
        base_url = address;
    }
    /*
     *检测网络状态
     *
     **/

    static checkNet = (callback) =>{
        NetInfo.isConnected.fetch().done();
        var _this = this;
        this.handel = (status)=>{
            if (Platform.OS === 'ios'){
                if (status.type === 'none' || status.type == 'unknown'){
                    callback(false);
                }else{
                    callback(true);
                }
            }else{
                if (status.type === 'NONE' || status.type == 'UNKNOWN'){
                    callback(false);
                }else{
                    callback(true);
                }
            }
            NetInfo.removeEventListener('connectionChange', _this.handel);
        };
        NetInfo.addEventListener('connectionChange', this.handel);
    }
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  suc:成功回调函数
     *  fail:失败回调函数
     * */
    static get(url,params,suc,fail){
        if (url.search(/http/) === -1){
            url = base_url + url;
        }

        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                suc(response)
            })
            .catch((error) => {
                fail(error)
            }).done();
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  suc:成功回调函数
     *  fail:失败回调函数
     * */
    static post(url,params,suc,fail){
        if (url.search(/http/) === -1){
            url = base_url + url;
        }
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                suc(responseJSON)
            })
            .catch((error) => {
                fail(error);
            }) .done();
    }



}

module.exports = SFNet;