# React-Node搭建的博客
曾经用的php+mysql+js写的博客，现在看来已经很low了，所以用目前最火的
react+koa框架重构一下。
先上地址吧：目前线上版本[http://www.liuweibo.cn/](http://www.liuweibo.cn/)，要想看到最新版本和代码，请看Github地址
[https://github.com/Weibozzz/react-blog.git](https://github.com/Weibozzz/react-blog.git)，
因为博客正在开发中，部分功能可以使用，因为还没有优化，首屏可能有点大，大概10几秒，后面会慢慢修改的，嘿嘿
## 用到的主要技术栈
React+React-router+redux+antd+axios+webpack+es6+koa

## 用到的库和版本。
```
{
  "name": "app2",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "antd": "^3.5.1",
    "autoprefixer": "7.1.6",
    "axios": "^0.18.0",
    "babel-core": "6.26.0",
    "babel-eslint": "7.2.3",
    "babel-jest": "20.0.3",
    "babel-loader": "7.1.2",
    "babel-preset-react-app": "^3.1.1",
    "babel-runtime": "6.26.0",
    "case-sensitive-paths-webpack-plugin": "2.1.1",
    "chalk": "1.1.3",
    "css-loader": "0.28.7",
    "dotenv": "4.0.0",
    "dotenv-expand": "4.2.0",
    "file-loader": "1.1.5",
    "fs-extra": "3.0.1",
    "highlight": "^0.2.4",
    "highlight.js": "^9.12.0",
    "html-to-markdown": "^1.0.0",
    "html-webpack-plugin": "2.29.0",
    "html2markdown": "^1.1.0",
    "jest": "20.0.4",
    "object-assign": "4.1.1",
    "postcss-flexbugs-fixes": "3.2.0",
    "postcss-loader": "2.0.8",
    "promise": "8.0.1",
    "raf": "3.4.0",
    "react": "^16.3.2",
    "react-dev-utils": "^5.0.1",
    "react-dom": "^16.3.2",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.2.2",
    "redux": "^4.0.0",
    "redux-thunk": "^2.2.0",
    "resolve": "1.6.0",
    "simplemde": "^1.11.2",
    "style-loader": "0.19.0",
    "sw-precache-webpack-plugin": "0.11.4",
    "url-loader": "0.6.2",
    "webpack": "3.8.1",
    "webpack-dev-server": "2.9.4",
    "webpack-manifest-plugin": "1.3.2",
    "whatwg-fetch": "^2.0.3"
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  },
  "devDependencies": {
    "marked": "^0.3.19",
    "react-css-modules": "^4.7.2"
  }
}
```
## 选用的技术栈
### 前端
在前端三大框架的选择，`Angular,React,Vue`,使用了前端最为流行的React框架，其实当时可以用Vue,
因为公司用的Vue也比较熟悉，用的比较多，也简单快速，没有接触过React的我，只闻其牛，也给自己一个挑战，学习其中的思想，
`Angular`是因为在Github的star远远落后于前两者，当然后面会了解它，目前就用React了配合用了阿里的`antd`。
### 后端
重构博客嘛，以前用php写的后台，所以略懂一些，作为一个前端开发，目标就是全栈嘛，选用了最为流行的`node`,也用了目前最为流行的koa作为
后端配合`mysql`。
### 文本编辑
博客，那当然要进行发表文章和修改文章，我选用了`Markdown`语法，
借助了marked库。
### 目前博客存在的问题
文章发布和文章修改，因为文章可能比较长，还有问题就是存入数据库的时候
有特殊字符需要更改，所以有时候会失败，正在修改中......
### 运行
1.克隆代码
```bash
git clone
```
2.进入后端启动服务，当然要安装数据库mysql了
```bash
cd koa2-router-demo
npm install 
npm start
```bash
3.进入前端文件
```bash
cd app2
npm install
npm start
```
注意：先启动node后端服务，再启动前端，因为前台需要后端提供的数据服务嘛。
