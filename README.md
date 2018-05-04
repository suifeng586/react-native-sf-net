# react-native-sf-net


# 网络请求post、get 网络状态检查


# 安装
> npm install react-native-sf-net


# Methods
|  Methods  |  Params  |  Param Types  |   description  |  Example  |
|:-----|:-----|:-----|:-----|:-----|
|checkNet|function<br>(isConnect)=>{}|func|检测网络状态||
|config|url|string|全局配置请求域名||
|get|url/params/suc/fail|string/object/func/func|get请求||
|post|url/params/suc/fail|string/object/func/func|post请求||


# 例子
```
import SFNet from 'react-native-sf-net';

//统一配置服务器地址
SFNet.config('你的服务器地址')

SFNet.post('你的接口',params,(data)=>{} (err)=>{})
```


