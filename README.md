# Simple-Modal-Manager

This is a small, framework agnostic tool to manage modals globally in your app.
It has binding for React (version >= 18 required) provided by useSyncExternalStore hook.

NOTE: It is global modal management system, and do not provides UI modal component

For example, you can use below code to show a modal anywhere:

```tsx
import modals from 'src/libs/modals'; // created modal manager
import MyModal from './MyModal';

//...
modals.open({children: MyModal, props: { someProp: 'hello' }});
//...
```

**NOTE**: `simple-modal-manager` is not a React modal component but should be used with other 
modal/dialog implementions by UI libraries like 
[Material UI](https://material-ui.com/), 
[Ant.Design](https://ant.design), 
[Bootstrap React](https://react-bootstrap.github.io/), 
etc.

# Key Features
* uses Stack-like to manage modals.
* Zero dependency and small: ~*N*kb after gzip.
* Uncontrolled. You can close modal itself in the modal component.
* Decoupled. You don't have to import a modal component to use it. Modals can be managed by id.
* Easy to integrate with any UI library.
* ...

# Motivation
TODO

## Create Your Modal Manager
With this lib you can create a separate modal component easily.

```ts
// create instace of modal manager
export const modals = createModalManager();
```
Then you can use the `modals` object to manage your modals.

```ts
modals.open({children: MyModal, props: { someProp: 'hello' }});
```

Then you need place where you want to render it. For example, you can create a `ModalContainer` component:

```tsx
import { Modal } from 'antd';
import { createUseStoreSelector } from 'simple-modal-manager/react';

// create a hook to select modals
const useModalSelector = createUseStoreSelector(modalManagerStore)

export const useSelectModalIds = () => useModalSelector((s) => s.map(m => m.id))
export const useSelectModal = (id: ModalId) => useModalSelector(s => s.find(m => m.id === id))

export const App = () => {
  // Use a hook to manage the modal state
  const modals = useSelectModalIds()
  return (
    <div>
      ...
      <ModalsRenderer />
      ...
    </div>
  );
}

export const ModalsRenderer: FC = () => {
  const modalIds = useSelectModalIds()
  return <>
    {modalIds.map(id => (
      <ModalRenderer key={id} id={id} />
    ))}
  </>
}

type Context = {
  id: ModalId
  isOpen: boolean
  onClose: () => void
}
const ModalContext = createContext<Context | null>(null)

const ModalRenderer: FC<{ id: ModalId }> = ({ id }) => {
  const modal = useSelectModal(id)
  const isOpen = modal?.status === ModalStatus.OPENED
  const onClose = useCallback(() => modals.close(id), [id])
  const contextValue = useMemo(() => ({ id, isOpen, onClose }), [id, isOpen, onClose])
  if (!modal) return null
  const Component = modal.children
  return <ModalContext.Provider value={contextValue}>
    {/* You can use any modal library you want and bind it's props here*/}
    <MyModal isOpen={isOpen} onClose={onClose}> 
      <Component {...modal.props} />
    </MyModal>
  </ModalContext.Provider>
}

```

From the code, we can see:
* The modal is uncontrolled. You can hide your modal inside the component regardless where it is showed.
* The high order component created by `NiceModal.create` ensures your component is not executed before it becomes visible.
* You can call `modal.remove` to remove your modal component from the React component tree to reserve transitions.

Next, let's see how to use the modal.

## Using Your Modal Component
There are very flexible APIs for you to manage modals. See below for the introduction.

### Embed your application with `NiceModal.Provider`:
Since we will manage status of modals globally, the first thing is embedding your app with NiceModal provider, for example:

```js
import NiceModal from '@ebay/nice-modal-react';
ReactDOM.render(
  <React.StrictMode>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

The provider will use React context to maintain all modals' state.

### Using the modal by component
You can control a nice modal by the component itself.
```js
import NiceModal from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

function App() {
  const showAntdModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show(MyAntdModal, { name: 'Nate' })
  };
  return (
    <div className="app">
      <h1>Nice Modal Examples</h1>
      <div className="demo-buttons">
        <button onClick={showAntdModal}>Antd Modal</button>
      </div>
    </div>
  );
}
```

### Use the modal by id
You can also control a nice modal by id:
```js
import NiceModal from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

// If use by id, need to register the modal component.
// Normally you create a modals.js file in your project
// and register all modals there.
NiceModal.register('my-antd-modal', MyAntdModal);

function App() {
  const showAntdModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show('my-antd-modal', { name: 'Nate' })
  };
  return (
    <div className="app">
      <h1>Nice Modal Examples</h1>
      <div className="demo-buttons">
        <button onClick={showAntdModal}>Antd Modal</button>
      </div>
    </div>
  );
}
```


### Use modal with the hook
The `useModal` hook can not only be used inside a modal component but also any component by passing it a modal id/component:

```jsx
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

NiceModal.register('my-antd-modal', MyAntdModal);
//...
// if use with id, need to register it first
const modal = useModal('my-antd-modal');
// or if with component, no need to register
const modal = useModal(MyAntdModal);

//...
modal.show({ name: 'Nate' }); // show the modal
modal.hide(); // hide the modal
//...
```

### Declare your modal instead of `register`
The nice modal component you created can be also used as a normal component by JSX, then you don't need to register it. For example:

```jsx
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

function App() {
  const showAntdModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show('my-antd-modal')
  };
  return (
    <div className="app">
      <h1>Nice Modal Examples</h1>
      <div className="demo-buttons">
        <button onClick={showAntdModal}>Antd Modal</button>
      </div>
      <MyAntdModal id="my-antd-modal" name="Nate" />
    </div>
  );
}
```

With this approach, you can get the benifits:
* Inherit React context in the modal component under some component node.
* Pass arguments to the modal component via props.

> NOTE: if you show the component by id but the modal is not declared or registered. Nothing will happen but only a warning message in the dev console.

### Using promise API
Besides using props to interact with the modal from the parent component, you can do it easier by promise. For example, we have a user list page with a add user button to show a dialog to add user. After user is added the list should refresh itself to reflect the change, then we can use below code:

```jsx
NiceModal.show(AddUserModal)
  .then(() => {
    // When call modal.resolve(payload) in the modal component
    // it will resolve the promise returned by `show` method.
    // fetchUsers will call the rest API and update the list
    fetchUsers()
  })
  .catch(err=> {
    // if modal.reject(new Error('something went wrong')), it will reject the promise
  }); 
```

You can see the live example on codesandbox.

### Integrating with Redux
Though not necessary, you can integrate Redux to manage state of nice modals. Then you can use Redux dev tools to track/debug state change of modals. Here is how to do it:

```jsx
// First combine the reducer
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import NiceModal from '@ebay/nice-modal-react';
import { Button } from 'antd';
import { MyAntdModal } from './MyAntdModal';
import logger from 'redux-logger';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(logger));

const store = createStore(
  combineReducers({
    modals: NiceModal.reducer,
    // other reducers...
  }),
  enhancer,
);

// Passing Redux state to the nice modal provider
const ModalsProvider = ({ children }) => {
  const modals = useSelector((s) => s.modals);
  const dispatch = useDispatch();
  return (
    <NiceModal.Provider modals={modals} dispatch={dispatch}>
      {children}
    </NiceModal.Provider>
  );
};

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ModalsProvider>{children}</ModalsProvider>
    </Provider>
  );
}
```

### Using with any UI library
NiceModal provides  lifecyle methods to manage the state of modals. You can use modal handler returned by `useModal` hook to bind any modal like component to the state. Below are typical state and methods you will use:

* **modal.status**: the status of Modal, one of 'opened', 'closed' or 'closing'
* **modal.open**: will open the modal, set status to 'opened', or passed status
* **modal.close** will close the modal, and remove it from stack

Based on these properties/methods, you can easily use it with any modal-like component provided by any UI libraries.


```jsx
import NiceModal, {
  muiDialog,
  muiDialogV5,
  antdModal,
  antdModalV5,
  antdDrawer,
  antdDrawerV5,
  bootstrapDialog
} from '@ebay/nice-modal-react';

//...
const modal = useModal();
// For MUI
<Dialog {...muiDialog(modal)}>

// For MUI V5
<Dialog {...muiDialogV5(modal)}>

// For ant.design
<Modal {...antdModal(modal)}>

// For ant.design v4.23.0 or later
<Modal {...antdModalV5(modal)}>

// For antd drawer
<Drawer {...antdDrawer(modal)}>

// For antd drawer v4.23.0 or later
<Drawer {...antdDrawerV5(modal)}>

// For bootstrap dialog
<Dialog {...bootstrapDialog(modal)}>

```

These helpers will bind modal's common actions to correct properties of the component. However you can always override the property after the helpers property. For example:

```jsx
const handleSubmit = () => {
  doSubmit().then(() => {
    modal.hide();
  });
}
<Modal {...antdModal(modal)} onOk={handleSubmit}>
```

In the example, the `onOk` property will override the result from `antdModal` helper.
