## react中数据状态管理的演变

1. react中的state管理
  - 父子组件通信 子组件通过props获取父组件传递过来的数据
  - 多个 Component 之间要发生交互, 那么状态(即: 数据)就维护在这些 Component 的最小公约父节点上
  - 单向数据流，子组件不可以直接更改父组件的状态
  比如有个Counter的组件在父组件中被调用
  ```js
  <Counter id="count">
  ```
  在子组件中通过如下方式获取数据状态
  ```js
  this.props.count
  ```
  

2. react-redux
  - 全局状态管理
  - 解决通信问题
  - React 只负责页面渲染, 而不负责页面逻辑, 页面逻辑可以从中单独抽取出来, 变成 store,但是却无法执行异步操作，例如常用的数据请求等
  --------
  在具体讲react-redux之前，先来简单说一下redux；
  ```js
  import { creatStore } from 'redux'
  import reducer from  './reducer.js'
  <!-- reducer中是一个函数  funciton reducer(state, action) {} -->
  let store = createStore(reducer)
  ```

  ```js
  function dispatch(action){
    //传入老状态和action,计算出新状态，更新新状态
    state=reducer(state,action);
    listeners.forEach(listener=>listener());
  }
  ```



  action.js
  ```js
  add() {
    return {type: 'ADD'}  //store.dispatch({type: 'ADD'})  --> reducer  这个是通过mapDispatchToProps 来实现的一个映射关系
  }
  ```
  ---------

3. redux+saga
  > redux-saga 是一个 redux 中间件,用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等），它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易

  - 使用麻烦 如下图 store/index.js, 需要配 middleware
 ```js
  
  import { createStore, combineReducers, applyMiddleware } from 'redux';
  import createSagaMiddleware from 'redux-saga'; 
  import reducer from './reducer';  //reducer
  import { rootSaga } from './saga.js';  // generator

  const sagaMiddleware = createSagaMiddleware()

  let store = applyMiddleware(sagaMiddleware)(createStore)(reducer)

  sagaMiddleware.run(rootSaga);


  export default store;
  ```
  - redux 的项目通常要分 reducer, action, saga, component 等等，我们需要在这些文件之间来回切换。并且这些文件通常是分目录存放的：

  ```
  + src
    + sagas
      - detail.js
    + reducers
      - detail.js
    + actions
      - detail.js
  ```
所以通常我们需要在这三个 detail.js 中来回切换。 这样的频繁切换很容易打断编码思路


4. 基于 React + Redux + Saga 的最佳实践沉淀DVA
>dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验.

在使用了dva之后，我们不需要再去配 middleware，不需要初始化 saga runner，不需要创建 store，不需要写 createStore，然后和 Provider 绑定，等等，极大地提升了编码体验

https://github.com/sorrycc/blog/issues/6



