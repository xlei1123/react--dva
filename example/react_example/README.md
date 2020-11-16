## react基础
函数组件默认参数是props

```js
//直接在select上面表示选中的项
<label>
  Pick your favorite La Croix flavor:
  <select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
  </select>
</label>
 
```
多个input输入处理的技巧

非受控组件：

如果让表单数据由 DOM 处理时，替代方案为使用非受控组件。

#### 包含关系
>一些组件不能提前知道它们的子组件是什么。这对于 Sidebar 或 Dialog 这类通用容器尤其常见。
我们建议这些组件使用 children 属性将子元素直接传递到输出。

有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children：
```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```
#### 特殊实例
>有时我们认为组件是其他组件的特殊实例。例如，我们会说 WelcomeDialog 是 Dialog 的特殊实例。
在 React 中，这也是通过组合来实现的，通过配置属性用较特殊的组件来渲染较通用的组件。
```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
```
#### 深入jsx
本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。比如下面的代码：
```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
1. 指定 React 元素类型
JSX 的标签名决定了 React 元素的类型。

大写开头的 JSX 标签表示一个 React 组件。这些标签将会被编译为同名变量并被引用，所以如果你使用了 <Foo /> 表达式，则必须在作用域中先声明 Foo 变量。
1. React 必须声明

由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。
2. 点表示法
你还可以使用 JSX 中的点表示法来引用 React 组件。你可以方便地从一个模块中导出许多 React 组件。
例如，有一个名为 MyComponents.DatePicker 的组件，你可以直接在 JSX 中使用它：
```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```
3. 默认为 True
如果你没有给属性传值，它默认为 true。因此下面两个 JSX 是等价的：
```js
//不建议
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```
4. 扩展属性
```js
//如果你已经有了个 props 对象，并且想在 JSX 中传递它，你可以使用 ... 作为扩展操作符来传递整个属性对象。下面两个组件是等效的：

function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
5. 布尔值、Null 和 Undefined 被忽略
false、null、undefined 和 true 都是有效的子代，但它们不会直接被渲染。

6. 属性默认值
你可以通过配置 defaultProps 为 props定义默认值：
```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
>如果你在使用像 transform-class-properties 的 Babel 转换器，你也可以在React 组件类中声明 defaultProps 作为静态属性。
这个语法还没有最终通过，在浏览器中需要一步编译工作。更多信息，查看类字段提议。
```js
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
// defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。
// 类型检查发生在 defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面。
```
6. Refs & DOM  类组件怎么ref?
>Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或 React 元素。
在典型的 React 数据流中, 属性（props）是父组件与子组件交互的唯一方式。要修改子组件，你需要使用新的 props 重新渲染它。
但是，某些情况下你需要在典型数据流外强制修改子组件。要修改的子组件可以是 React 组件的实例，也可以是 DOM 元素。
对于这两种情况，React 提供了解决办法。
* 创建 Refs
使用 React.createRef() 创建 refs，通过 ref 属性来获得 React 元素。
当构造组件时，refs 通常被赋值给实例的一个属性，这样你可以在组件中任意一处使用它们.
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

* 访问 Refs
当一个 ref 属性被传递给一个 render 函数中的元素时，可以使用 ref 中的 current 属性对节点的引用进行访问。
```js
const node = this.myRef.current;
```
**你不能在函数式组件上使用 ref 属性，因为它们没有实例。**

>React 会在组件加载时将 DOM 元素传入 current 属性，在卸载时则会改回 null。
**ref 的更新会发生在componentDidMount 或 componentDidUpdate 生命周期钩子之前。**

* 另外一种创建和访问ref的方式：回调 Refs


>更加细致地控制何时 ref 被设置和解除。不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。
这个函数接受 React 组件的实例或 HTML DOM 元素作为参数，以存储它们并使它们能被其他地方访问。
```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 直接使用原生 API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 渲染后文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
回调形式的ref父子组件传递
```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
>如果 ref 回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是 null ，之后参数是 DOM 元素。
这是因为在每次渲染中都会创建一个新的函数实例。因此，React 需要清理旧的 ref 并且设置新的。
通过将 ref 的回调函数定义成类的绑定函数的方式可以避免上述问题，但是大多数情况下无关紧要。

7. 性能优化
* 当一个组件的props或者state改变时，React通过比较新返回的元素和之前渲染的元素来决定是否有必要更新实际的DOM。当他们不相等时，React会更新DOM。
* 在一些情况下，你的组件可以通过重写这个生命周期函数shouldComponentUpdate来提升速度， 它是在重新渲染过程开始前触发的。 这个函数默认返回true.
* 关于React.PureComponent
>大部分情况下，你可以使用React.PureComponent而不必写你自己的shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。
```js
handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

```
* 避免出现上述情况：不会突变的数据的力量（重点）
避免此类问题最简单的方式是避免使用值可能会突变的属性或状态。例如，上面例子中的handleClick应该用concat重写成：
```js
handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}

//或者下面这样
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```
8. Mixin(混入)
>注：
ES6 本身是不包含混入支持的。因此，如果你使用 class 关键字创建组件，那就不能使用混入功能了。
我们也发现了很多使用混入然后出现了问题的代码库。因此，我们并不推荐在 ES6 中使用混入.
9. 对比

* 不同类型的元素
>当树被卸载，旧的DOM节点将被销毁。组件实例会调用componentWillUnmount()。当构建一棵新树，新的DOM节点被插入到DOM中。
组件实例将依次调用componentWillMount()和componentDidMount()。任何与旧树有关的状态都将丢弃。
* 相同类型的DOM元素
>当比较两个相同类型的React DOM元素时，React则会观察二者的属性，保持相同的底层DOM节点，并仅更新变化的属性
* 相同类型的组件元素
>当组件更新时，实例仍保持一致，以让状态能够在渲染之间保留。React通过更新底层组件实例的props来产生新元素，并在底层实例上依次调用componentWillReceiveProps() 和 componentWillUpdate() 方法。
接下来，render()方法被调用，同时对比算法会递归处理之前的结果和新的结果。

10. context consumer
> context设计的目的是为了共享那些对于一个组件树而言是“全局”的数据

- 简单示例

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}


// 注意：undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效
// 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新
```
- 消费多个Context

```js
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```


## react-redux
>为了解决每次都需要在组件中将属性绑定到状态，还要订阅数据的问题 
```js
// state = {   //绑定数据
//   number: store.getState().counter.number
// }
// componentWillMount() {
//   this.unsub = store.subscribe(() => {   //订阅
//     this.setState({
//       number: store.getState().counter.number
//     })
//   })
// }
// componentWillUnmount() {    //取消订阅
//   this.unsub();
// }
```

1. react-redux用法
```js
//在根级 需要 Provider
ReactDOM.render(<Provider store={store}>
<>
  <Counter></Counter>
  <Todo></Todo>
  <Test><p>xxxx</p><p>xxxx</p></Test>
</>
</Provider>,window.root);
//在需要的组件中需要connect
import { connect } from 'react-redux';


// 组件内部
handleClick = () => {
  this.props.add(3);
}
//组件内部

let mapStateToProps = (state) => { // store.getState()
  return {
    number: state.counter.number,
  }
};
let mapDispatchToProps = (dispatch) => { // store.dipspatch
  return {
    add: (n) => dispatch(actions.add(n))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```
> 优化:我们看到上面的mapStateToProps和mapDispatchToProps如果很多属性和方法写起来就会很复杂，那么redux给我们提供了一个方法来绑定方法bindActionCreators
```js
// import {bindActionCreators} from 'redux'
// export default connect((state) => ({ ...state.counter }), (dispatch) => 
//   bindActionCreators(actions,dispatch)
// )(Counter);


//下面这样用还需要引入bindActionCreators吗？不需要

// 如果connect 第一次执行的函数 ，如果第二个参数是对象类型 会自动内部调用bindActionCreator来实现
export default connect((state) => ({ ...state.counter }), actions)(Counter);
```

## 类似vue中的插槽实现
```js
import React from 'react';

export default class Test extends React.Component{
  render(){
    return <div>
    hello
    {React.Children.map(this.props.children,(child,index)=>{
        return <li>{child}</li>
    })}
    </div>
  }
}
```

## react-router-dom
```js
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'


```

动态路由 和 vue-rotuer一样

```js
// <Link> 和 <NavLink>的区别 并且有属性exact={true} 属性
// NavLink有个active

```
**所有路由渲染出来的组件路由信息都在this.props**

#### 受保护路由
render属性 是一个函数 返回的结果可以被渲染
```js
import React from 'react';
import {Route,Redirect} from './react-router-dom'
export default function ({component:Component,...rest}){
   return <Route {...rest} render={(props)=>{
     return localStorage.getItem('login') ? <Component {...props}/>  :<Redirect to="/login"/>
   }}></Route>
}
```

#### 自己封装高阶Route
```js
import React from 'react';

import {Link,Route} from './react-router-dom';

// children就是不管路径是否匹配到都能执行
export default function (p) {
  // 主要用到的就是route 匹配到后的match
  return <Route path={p.to} exact={p.exact} children={(props)=>{
    return <li className={props.match?'active':''}>
      <Link to={p.to}>{p.children}</Link>
    </li>
  }}/>
}
```
## dva
>React 应用框架 将路由： React-Router，架构： Redux，异步操作： Redux-saga三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷。dva = React-Router + Redux + Redux-saga
#### connect 方法

>connect 是一个函数，绑定 State 到 View
```js
import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```
#### dispatch 方法
>dispatch 是一个函数方法，用来将 Action 发送给 State。
```js
dispatch({
  type: 'click-submit-button',
  payload: this.form.data
})
```
你最大的疑惑大概就是 dispatch 方法从哪里来？

被 connect 的 Component 会自动在 props 中拥有 dispatch 方法

#### Model 对象的Effect

>Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。

```js
function *addAfter1Second(action, { put, call }) {
  yield call(delay, 1000);
  yield put({ type: 'add' });
}

//call 和 put

```
dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put:

* call：执行异步函数
* put：发出一个 Action，类似于 dispatch



1. dva的数据管理在models文件下
```js
//ProductList 页面
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';


const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);
```
>Action 是一个普通 javascript 对象，它是改变 State 的唯一途径。无论是从 UI 事件、网络回调，还是 WebSocket 等数据源所获得的数据，最终都会通过 dispatch 函数调用一个 action

>从而改变对应的数据。action 必须带有 type 属性指明具体的行为，其它字段可以自定义

>如果要发起一个 action 需要使用 dispatch 函数；需要注意的是 dispatch 是在组件 connect Models以后，通过 props 传入的。

-------------------------------------


1. withRouter用法？






---------------------------------------------------------------
react源码地址： https://gitee.com/zhufengpeixun/zfreact

### 大致过程
jsx通过babel （AST语法树） 编译 --》 
```js
// createElement(type, props, ...children)
React.createElement('button', {}, ...)  
// 上面形成的其实就是虚拟dom {type:'button', props:{}}  props里面包含属性 事件还有子元素

// render的时候 依据不同的type 拼成不同的元素节点，渲染出来
```

JSX 代表 Objects
Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。

下面两种代码的作用是完全相同的：
```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
React.createElement() 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：

// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
这样的对象被称为 “React 元素”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。



### 其他：
在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。
```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
在这里，e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。

键（key）只是在兄弟之间必须唯一
>数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键

包含关系
一些组件不能提前知道它们的子组件是什么。这对于 Sidebar 或 Dialog 这类通用容器尤其常见。

我们建议这些组件使用 children 属性将子元素直接传递到输出。
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```


组合对于定义为类的组件同样适用：
```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```