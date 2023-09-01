---
title: 关于git ssl connect出错的问题
categories:
  - 学习
tags:
  - git
abbrlink: 7172e25b
date: 2021-04-05 10:41:18
---

本文主要说一下之前说hexo写完文章后，git deploy时总是会报SSL CONNECT 443的错，今天我试着按网上的一些方法做了下，像类似的设置IPV6的方法对我用处不大，一开始重启iterm还可以，不过后来也是不太行了<!--more-->

错误如下所示：

```bash
 LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

### 解决办法

编辑~/.gitconfig文件，添加下面的这段代码，代码可能会有些不同

![](https://cdn.makiru.top/images/image-20210405105329661.png)

我之所以报错是因为设置了代理服务器，因为用的是socks代理，所以之前才会一直报错，至于这里的端口问题，每个人可能都不太一样，可以去自己的代理软件去查看（我的是clashx，一般都为7890）

<font color=red>注意：如果上图中的不起作用，可以将socks5换成http，对应的，h也可以添加https的代理，那么，proxy的前缀则为https（我这边用socks5代理好像不太起作用——2022/03/22修改）</font>



### 总结

遇事别紧张，办法总会有的，你不会不代表别人不会，但不会没事，去查呗，本人憨憨一枚，就是这么厚脸皮。。。。