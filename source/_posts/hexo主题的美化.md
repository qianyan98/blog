---
title: hexo主题的美化
categories:
  - 学习
tags:
  - hexo
abbrlink: e9a449dc
date: 2021-04-03 17:04:52
---

搭建完博客后，自然想到的就是将自己的博客变得更美观一点，因此，本文记录了本憨憨是如何将自己的博客弄得稍微好看了点，其实弄完后才会发现原来弄完会这么好看，就连写文档都会开心很多<!--more-->

### 选择主题

我选择的是next主题，在前一篇博文里已经介绍过如何更换主题，接下来的操作就都将是修改主题文件中的配置文件，由于我选择的是next，所以接下来便以next主题为例介绍。

首先配置文件的位置是在：你的博客文件夹（我的就是hexo）/theme/，接下来的文件夹便是主题文件夹，进入后，就有个_config.yml文件，主题的大多数配置都在该文件夹里

next主题有四种样式，分别为：

```bash
# Schemes
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini   #只需要去主题配置文件中修改即可
```

我个人选择的是Gemini，其实后两种的区别不大，相比于前两种，页面更加丰富，留白也相对较少，样式如下：

<img src="https://cdn.makiru.top/images/image-20210404211542968.png" alt="" style="zoom: 25%;" />

### 评论区的实现

我个人采用的是valine，我觉得用起来还是比较方便的，后台的管理也是很轻松，邮件通知也很好用

#### 第一步：注册账号

首先去leancloud的国际版去注册个账号，国内版的有很大问题：https://us.leancloud.cn/

#### 第二步：创建应用并部署

注册完之后，创建应用，选择开发版，创建class，选择不限制，选择云引擎的部署，点击项目部署，选择git部署，输入：https://github.com/DesertsP/Valine-Admin.git，点击部署即可

进入设置，按下图设置变量：

<img src="https://cdn.makiru.top/images/2021040492335.png" alt="" style="zoom:33%;" />

​	其中的smtp_pass需要去邮箱设置，这里就不介绍了，admim_url就是下面云引擎设置的域名，名称可以自己定（这里就是不用国内版的原因，国内版的没有这个送的域名，很麻烦，害我弄了好久才发现是这个问题）

#### 第三步：设置定时任务

接下来就是设置下定时任务:

<img src="https://cdn.makiru.top/images/image-20210404212733906.png" alt="" style="zoom:33%;" />

#### 第四步：修改配置文件

然后就是去博客的主题配置文件中去定义valine的参数，比较新的next主题其实已经写好了，就需要自己调下，如下图：

<img src="https://cdn.makiru.top/images/image-20210404213025705.png" alt="" style="zoom: 50%;" />

将这里的active:后面的设为valine

![](https://cdn.makiru.top/images/image-20210404213215679.png)

这里的appid和appkey在刚才创建的应用的设置里的应用keys里就有，填入即可

接下来便是浏览器进入之前设置的那个avosapps.us/sign-up的网址，设置管理员的密码账户，后面就可以在这个网址里管理评论

邮件通知在前面的环境变量设置中已经设置好了，然后就可以去自己的博客测试下了。

### 总结

其实评论区的设置还是花了我点时间的，因为leancloud竟然还有国际版，我就说我怎么一直找不到avosapps.us的域名