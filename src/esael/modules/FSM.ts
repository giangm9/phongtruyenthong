export interface State {
  start?(): void;
  update(dt: number): void;
  end?(): void;
}

export var currentState: State = null;
export function Update(dt: number) {
  currentState
    && currentState.update
    && currentState.update(dt)
}

export function changeState(state: State) {
  currentState
    && currentState.end
    && currentState.end();
  state
    && state.start
    && state.start();
  currentState = state;
}