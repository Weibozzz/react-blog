# 后端说明
## 运行
```
npm install
npm start
```
## 项目文件夹说明
```
E:\project\myself\ctrl\aa\react-blog\koa2-router-demo
├─.gitignore
├─app.js
├─package.json
├─views
|   ├─error.pug
|   ├─index.pug
|   └layout.pug
├─until           // 前端调用的所有接口，返回的是所有的sql语句
|   ├─frontEnd
|   |    └index.js
|   ├─common
|   |   └index.js
|   ├─backEnd
|   |    └index.js
├─routes
|   ├─index.js   // 请求文件，发送sql请求
|   └users.js
```