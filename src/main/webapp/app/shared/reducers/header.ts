export const ACTION_TYPES = {
  SHOW_SIDEBAR: 'header/SHOW_SIDEBAR',
  HIDE_SIDEBAR: 'header/HIDE_SIDEBAR',
  TOGGLE_SIDEBAR: 'header/TOGGLE_SIDEBAR'
};

const initialState = {
  isSidebarVisible: false
};

export type HeaderState = Readonly<typeof initialState>;

// Reducer
export default (state: HeaderState = initialState, action): HeaderState => {
  switch (action.type) {
    case ACTION_TYPES.SHOW_SIDEBAR:
      return {
        ...state,
        isSidebarVisible: true
      };
    case ACTION_TYPES.HIDE_SIDEBAR:
      return {
        ...state,
        isSidebarVisible: false
      };
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarVisible: !state.isSidebarVisible
      };
    default:
      return state;
  }
};

// Actions

export const showSidebar = () => ({
  type: ACTION_TYPES.SHOW_SIDEBAR
});

export const hideSidebar = () => ({
  type: ACTION_TYPES.HIDE_SIDEBAR
});

export const toggleSidebar = () => ({
  type: ACTION_TYPES.TOGGLE_SIDEBAR
});
