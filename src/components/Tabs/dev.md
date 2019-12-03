# 多标签页+状态保存
标签变动有三种情况：
1. 点击左边列表，添加标签
1. 删除标签
1. 直接点击标签进行切换

标签切换的时候路由不一定会变化，路由变化的时候标签也不一定会变化。

对于组件来说，需要在挂载中设置两个回调：保存状态和还原状态。当标签进行切换的时候，操作如下：
1. 记录当前路径，判断组件是否会变化，告诉vuex标签切换了。
1. vuex调用保存状态的回调。如果组件会变，设置全局状态为真。否则直接调用还原状态回调。
1. 路由跳转。
1. 新组件注册回调，vuex发现全局变量为真，调用还原状态，状态恢复成功。
* 如果路由不变标签变了，保存状态和还原状态都会被执行。
* 如果路由变了标签不变，vuex全局变量为假，两个回调都不会执行。
* 如果路由变了标签变了，先执行保存状态的回调，然后vuex全局变量为真，等新组件注册回调时就会调用。