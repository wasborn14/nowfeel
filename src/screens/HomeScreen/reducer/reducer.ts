export interface Task {
  title: string;
  comment: string;
}

export interface HomeState {
  taskList: Task[];
}

export const initialState: HomeState = {
  taskList: [],
};

export const setTaskList = (payload: Task[]) => ({
  type: 'setTaskList',
  payload,
});

export type Action = ReturnType<typeof setTaskList>;

export const homeReducer = (state: HomeState, action: Action) => {
  switch (action.type) {
    case 'setTaskList':
      state.taskList = action.payload;
      break;
  }
};
