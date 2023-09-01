---
title: github+hexo搭建个人博客
categories:
  - 学习
tags:
  - github
  - hexo
abbrlink: 85811f6c
date: 2021-04-02 14:18:13
---

这是我第一次使用github以及hexo搭建的博客，在搭建的过程中，遇到了很多奇奇怪怪的问题，足足花了我将近一个上午的时间。在这里，我稍微记录一下我遇到的坑（其实就是两个大坑）<!--more-->

### 我的环境

Mac OS catalian

git version 2.28.0

Npm version 6.14.11

hexo-cli version 4.2.0

### 搭建的前提准备

首先需要在你的系统上安装好git和node.js，安装步骤如下：

git安装：使用mac自带的homebrew包管理系统安装

```bash
brew install git
```

安装完成后，可以查看相应的版本号：

```bash
git --version
```

Node.js安装：去官网下载与系统相对应的pkg包：https://nodejs.org/en/download/	安装过程直接一直点默认即可，其中安装的位置可以自己选择

安装完成后同样可以查看是否安装成功:

```bash
npm -v
```

接下来将hexo的基本框架先利用npm下载到本地，可以自己先创建一个文件夹hexo（名称随意），最好给这个文件夹赋予写的权限（不弄也行，不过后面可能需要sudo啥的），然后cd到该目录下，安装hexo:

```bash
npm install -g hexo-cli
```

安装完成后，可以查看hexo的版本：

```bash
hexo -v
```

然后继续执行：

```bash
npm init     #生成package.json文件
```

```bash
npm install hexo-deployer-git --save   #安装部署插件
```

```bash
npm install   #安装依赖
```

接着执行：

```bash
hexo init   #生成hexo的框架
```

框架基本如下：

<img src="https://cdn.makiru.top/images/2021040290855.png" alt="" style="zoom:50%;" />

到这里可以测试一下hexo是否安装好，在该目录下运行：

```bash
hexo g    #生成文件
```

```bash
hexo s     #启动服务
```

在浏览器里前往：http://localhost:4000	如果没报啥错，博客网站出现了就是成功的

### github方面的准备

首先你需要有一个github的账号，没有就去注册一个：https://github.com	登录进去后，点击右上角头像左边的加号，选择new repository创建一个新的库，Repository name直接填 用户名.github.io（注意，是用户名，不是昵称，也就是目前你写库名字前面的owner的名字），然后直接点create repository即可

接下来进入本地系统的~/.ssh目录下，查看是否有id_rsa以及id_rsa.pub两个文件，没有的话在该目录下运行：

```bash
ssh-keygen -t rsa -C "Github的注册邮箱地址"
```

进入github头像的setting里，选择ssh and GPG keys，将之前获得的id_rsa里的内容复制到ssh keys的内容框里，名称随意

<img src="https://cdn.makiru.top/images/2021040291819.png" alt="" style="zoom: 33%;" />

结束后到本地系统来看看是否成功：

```bash
ssh -T git@github.com
```

如果出现以下提示即可：

```
The authenticity of host 'GitHub.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)
```

接下来就可以一直选择默认回车下去，然后需要完善一些个人信息：

```bash
git config --global user.name "your name"   #输入注册时的username
git config --global user.email  "your email"  #填写注册邮箱
```

以上便完成了本地与github的连接

然后便是修改hexo文件夹下的_config.yml文件，主要是修改以下几个地方：

```
url: https://your name.github.io

deploy:
  type: git
  repo: https://github.com/your name/your name.github.io.git
  branch: main     #这里的main不能改为master，我就是这里被坑的
```

修改完后，可以将自己喜欢的主题克隆到hexo文件夹下的子文件夹theme里：

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next  #这里一定要注意：next主题的地址作者换掉了
```

替换主题后，去hexo下的_config.yml下，修改如下：

```
language: zh-Hans
timezone: 'Asia/Shanghai'
theme: next
```

到这里便基本完工了，将本地的博客上传至github即可：

```bash
hexo g
hexo d   #之后每次写完博客后，就可以直接利用这两句话上传
```

然后，浏览器打开：your name.github.io应该便能进入博客里

写博客的话，在hexo目录下：

```
hexo new "文章标题"
```

然后便是markdown的事了

### 其中的坑

第一：现在github改了，不再使用master,而是main作为默认的分支名

第二：git上传的时候（也就是hexo d）总是会断掉，提示啥443错误，我暂时没解决，不过重新打开个命令界面一般可以上传成功，八成是代理的问题

第三：更换主题后（我用的是next），结果一直报错，本人憨憨一个，还不看错误提示，结果是next的项目文件换网址了。

### 总结

写此文章仅为记录自己的憨憨一上午