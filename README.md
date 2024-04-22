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
