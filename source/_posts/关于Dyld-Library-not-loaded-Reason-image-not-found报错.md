---
layout: post
title: '关于Dyld: Library not loaded Reason: image not found报错'
categories:
  - 学习
tags:
  - python
abbrlink: 5169bb7d
date: 2022-01-03 11:35:57
---

不知道有没有使用mac的小伙伴遇到过这种问题，自己一开始起的账户名不是很喜欢，于是想要换一个，结果按照网上教程换完之后，账户名是变了，但是相应的好多之前配置的环境都报错了。如果有，哈哈哈哈，和我一样～

![](https://cdn.makiru.top/images/202201042047762.png)

<!--more-->

如果你也遇到了这个问题，不烦往下看看，说不定就解决了呢？

### 问题描述

我的问题是这样的，在昨天使用ssh连接我的azure的时候，发现总是会报一个我很眼熟的错，没错，就是很眼熟，错误如下：

![](https://cdn.makiru.top/images/202201042053488.png)

这个错是我复现出来的，因为我已经解决了

你会发现它报了一个dyld，库没有加载？其实大多数只要是报了这个错，八成是和你的python路径有关联，像我上图中的/usr/local/bin/ssh中一定是用到了与python有关的依赖，但是呢，目前，python找不到了，自然就会报错。



### 问题解决

首先，如果你要确定自己的python还能正常使用，试验方法应该不用我教了吧，直接敲个python或者python3回车看看就行了，如果不行，那说明你的python环境需要重新配置，mac的话直接在~目录下，修改.bash_profile或者.zshrc等文件就可以了。

其次，看清楚referenced from后面的是哪个，必须先搞清楚目前是哪个想要获取python的帮助但是没有获取到，像我这里就是/usr/local/bin/ssh，搞清楚后，自然要看看这个ssh有哪些依赖是需要的，敲入下面这行命令（其他的自行修改）：

```bash
otool -L /usr/local/bin/ssh
```

结果如下：

![](https://cdn.makiru.top/images/202201042108993.png)

我们会看到第三个依赖就是刚才报错的那条，因此，这条一定是有问题的，最直接的想法就是将这条给他改成正确的不就好了嘛？至于正确的是啥，请继续往下看。

我们需要知道自己的python在哪，一般情况下，如果是自己安装的，默认位置会在：

```bash
/Library/Frameworks/Python.framework/Versions/3.5/bin/python3.5
```

至于其中的3.5可能对每个人都有所改变

如果不能确定，可以使用以下命令进行查看：

```bash
which python
which python3
which python2
```

像博主这里呢，因为我是过于特立独行，将python3安装在了我用户目录下的library下了，而不是根目录下（流泪～）

于是乎，博主输入python，进入python3的命令行界面，敲入：

```python
import sys
sys.path
```

回车后你就会看到一大堆和python有关的信息，你要找的是这种：

```bash
/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.7/lib/python3.7
```

简单点说就是带Frameworks的，会有很多这种，选择一个，然后呢，将它改成这样：

```bash
/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.7/Python3
```

注意结尾的Python3，写成和Python3.framework中的一样，别写错了

退出python后，敲入：

```bash
sudo install_name_tool -change /usr/bin/python3 /Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.7/Python3 /usr/local/bin/ssh
```

<font color=red>注意修改，别傻乎乎的全照抄</font>

回车后，按道理应该就可以了，不放心的可以再敲下刚才那个otool指令看下就好了。



### 结束

到这里就结束啦，下部番剧就快要看完啦，不过博主最近忙着各种期末考，可能还得等段时间才能继续更新番剧的推荐啦，但是呢，还是会不定时的更一些实践类的文章的～拜拜啦～
