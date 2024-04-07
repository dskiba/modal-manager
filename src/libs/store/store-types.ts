export type Listener = () => void;

export type Reducer<State> = (state: State, payload?: any) => State;

export type Reducers<State> = Record<string, Reducer<State>>;

export type Actions<State, R extends Reducers<State>> = {
  [K in keyof R]: (payload?: Parameters<R[K]>[1]) => void;
};

export type Store<State, R extends Reducers<State>> = {
  getState: () => State,
  subscribe: (listener: Listener) => () => void,
  actions: { [K in keyof R]: (payload?: Parameters<R[K]>[1] | never) => void }
};
