## react中数据状态管理的演变

1. react中的state管理
  - 父子组件通信 利用props
  - 单向数据流

2. react-redux
  - 全局状态管理
  - 彻底解决通信问题
  - React 只负责页面渲染, 而不负责页面逻辑, 页面逻辑可以从中单独抽取出来, 变成 store


3. redux+saga
  > redux-saga 是一个 redux 中间件,用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等），它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易


4. 基于 React + Redux + Saga 的最佳实践沉淀DVA