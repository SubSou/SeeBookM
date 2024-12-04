export const initHomeForm = {
  isBtomY: 20,
};

export const HomeFormTypes = {
  UPDATE_TAB_BOTTOM: 'update_tab_bottom',
};

export const homeFormReducer = (state, action) => {
  switch (action.type) {
    case HomeFormTypes.UPDATE_TAB_BOTTOM:
      return { isBtomY: action.value };
    default:
      return state;
  }
};
