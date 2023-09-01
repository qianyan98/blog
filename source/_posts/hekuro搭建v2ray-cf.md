---
title: heroku搭建v2ray+cf
categories:
  - 学习
tags:
  - v2ray
abbrlink: 40a5bf82
date: 2021-04-26 22:25:01
---

这篇文章仅用来供大家学习使用，希望别用来做危害社会的事情。在此声明，出了什么问题与我无关（好像也没啥用呢）

其实呢，就是教大家怎么搭建一个日常备用的代理而已（也没什么太大的用处，学习而已）<!--more-->

### 引言

首先，再次说明下，我国严禁网络代理的使用，也就是说谷歌，油管啥的在我国是不允许使用，所以该文章仅用来学习使用，出了问题自行负责。除此之外，大佬请出门右转，这里的文章只适合萌新小白。

需要事先准备的东西：

1. 一个heroku的账户
2. 一个cloudflare的账户（没有？没事，待会教大家获取）
3. v2ray软件（没有没事，待会会发）
4. 好像没了？额，，确实没了吧

#### heroku的介绍

实际上，heroku是一种云平台服务，大家只需要知道和云有关的东西是很牛逼的就行了，能做好多好多事

说到这里，就需要大家去注册heroku的账户：https://signup.heroku.com/

<img src="https://cdn.makiru.top/images/image-20210506155506270.png" alt="" style="zoom: 25%;" />

select a language可以选择PHP，其他的按自己想的填就可

注册完后登录进去就行

#### cloudflare介绍

这个嘛，大家只要记得它可以用来反向代理流量的就行，也可以理解为让你看视频更快更流畅

注册嘛：https://dash.cloudflare.com/sign-up

<img src="https://cdn.makiru.top/images/image-20210506160020386.png" alt="" style="zoom:25%;" />

 

#### v2ray介绍

v2rayN作为一款代理软件，目前还是比较好用的，不过嘛，我个人还是比较喜欢小猫咪的（clash），下载位置：https://github.com/2dust/v2rayN/releases/download/4.14/v2rayN-Core.zip

这个是目前比较新的版本，喜欢其他版本的也可以自己去下，因为是github，可能下载都是个问题，所以放个我自己的盘吧：

https://qianyan.lanzous.com/b0263wn9g     密码:g8ro

### 开始搞起来

之前不是已经注册好heroku账号了嘛，登录进去，你们的界面应该和我这一样吧

<img src="https://cdn.makiru.top/images/image-20210506163205887.png" alt="" style="zoom: 25%;" />

可能有人会说不一样吧，确实不一样，因为我已经建好了两个app了，大家按照我的做法，待会也就可以建好一个了，

保持这个界面不变，点击下面这个链接：https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fbclswl0827%2Fv2ray-heroku  进入下面的界面

<img src="https://cdn.makiru.top/images/image-20210506163521178.png" alt="" style="zoom:25%;" />

App name 随你喜欢填，国家也可以选其他的，不过美国的好点，这里的UUID后面需要用到，不过也不用急着复制保存，后面还能找的到，填好后，点击depoly app即可，等出现your app was successfully depolyed就可以了，接着点击manage your app，进入管理界面。

然后再点击setting进入如下界面：

<img src="https://cdn.makiru.top/images/image-20210506164230699.png" alt="" style="zoom:25%;" />



到这里，其实你的代理已经算是搭建好了，接下里便是v2ray那边的事了。

### v2rayN配置

打开v2rayN.exe，长这样：

<img src="https://cdn.makiru.top/images/image_2021-05-06_16-45-05.png" alt="" style="zoom: 50%;" />

因为本来这张图有我的一些ip信息，所以处理过，别太介意

点击服务器，然后点击添加VMess服务器，进入如下界面：

<img src="https://cdn.makiru.top/images/image_2021-05-06_16-50-30.png" alt="" style="zoom:60%;" />

地址栏填啥呢？在这里找：就是下面图中我划掉的部分，记住要把https://和最后面的/删掉

<img src="https://cdn.makiru.top/images/image-20210506165229199.png" alt="" style="zoom:50%;" />

端口填443（大佬应该知道其实443是不怎么安全的，没人搭建v2ray用443端口，因为很容易封，不过嘛，我们只是备用而已，不容易封）

用户id就是之前说的UUID啦，在哪找呢

![](https://cdn.makiru.top/images/image-20210506165945811.png)

点击下Reveal Config Vars就会出现啦

传输协议选择ws，别名可以自己填个好管理的，路径填/，底层传输安全选择tls，允许不安全连接选择true，点击确定即可

然后，选中你的服务器，右键点击设为活动服务器，接下来便可以进入谷歌啥的了。。

<img src="https://cdn.makiru.top/images/image_2021-05-06_17-07-38.png" alt="" style="zoom: 67%;" />



如果对速度啥的没要求的朋友，到这其实就可以结束了，不过嘛，可能有和我一样的朋友，喜欢在油管上那种丝滑般的感觉，可以继续往下看。

### CF反向代理

这里嘛，就需要之前注册好的cloudflare账号咯

登录进去，应该长这样：

<img src="https://cdn.makiru.top/images/image-20210506171739750.png" alt="" style="zoom: 25%;" />

点击workers进去，界面长这样：

<img src="https://cdn.makiru.top/images/image-20210506171918744.png" alt="" style="zoom:25%;" />

因为我之前已经弄过两个了，所以这里会有两个worker，因为有部分隐私信息，所以涂了点鸦

点击创建worker，进去，然后，将左侧的脚本代码全部删掉，换成下面的代码：

```
addEventListener(
	"fetch",event => {
		let url=new URL(event.request.url);
		url.hostname="域名";
		let request=new Request(url,event.request);
		event. respondWith(
			fetch(request)
		)
	}
)
```

代码里的域名改为之前你填入v2rayN里的地址，就是我说别加https://和/的那个，千万注意前后别加空格

点击保存并部署即可，测试一下，点击发送，成功的话是这样：

<img src="https://cdn.makiru.top/images/image-20210506172625002.png" alt="" style="zoom:25%;" />

然后嘛，继续去v2rayN配置（注意，上图中的那个发送左边的地址复制下，待会有用）：

<img src="https://cdn.makiru.top/images/image_2021-05-06_17-29-08.png" alt="" style="zoom:50%;" />

将刚才复制的地址除掉开头的https://和最后的/填入地址栏，其他的不变，点击确认，便实现了反向代理，如果正常的话，油管的速度应该就可以上去了。

<img src="https://cdn.makiru.top/images/image_2021-05-06_17-33-42.jpeg" alt="" style="zoom:50%;" />

上图只是随便测的速度，大佬别介意。。。

由于cf反向代理选择的ip可能并不太适合每个人所在地区的网络，因此我们需要选择适合本地网络的ip用于cf，所以需要使用到筛选ip的工具，我给个盘的链接，有需要自己下：https://qianyan.lanzous.com/inrLtov6uof          密码:2970

使用方法嘛，很简单，双击CF优选IP.bat就可以进入命令行界面，然后它会让你输入一个自己想要的速度上限，一般根据自己网络带宽看，我的校园网比较拉，在50左右，所以我填的是60，70，80，其实可以一个一个试，看看最高多少，就用那个ip

怎么用呢，很简单，把ip填入v2rayN之前那个地址栏，把地址栏的原本内容填入那个伪装域名就可以了。

### 结束

到这里，我相信大家就可以愉快的使用了，油管啥的也可以尽情看了，不过嘛，有一些需要注意的地方：

1. 因为heroku这个相当于给学生研究用的，所以别过度滥用，比如整天多人地去看4k视频啦，租借啥的啦，一不小心会被封号的哟
2. 别用来做违法的事，多次声明，出了事与我无关
3. heroku好像多久不用会休眠来着，我也不太记得了，不过我的一直都没关，我也不常用，就用来搜点资料用用
4. 最好只是个人使用，多人使用封号几率很大，并且最后一个账号下多建几个应用，就像前面一样建个3到4个，换着用，负载均衡

以上便是所有的教程内容啦，下期见，拜拜～