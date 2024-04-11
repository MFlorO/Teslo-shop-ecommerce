import { createSlice } from '@reduxjs/toolkit'


interface UiState {
  isSidebarMenuOpen: boolean;
}


const initialState: UiState = {
  isSidebarMenuOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {

    openSideMenu: (state) => {
      state.isSidebarMenuOpen = true;
    },

    closeSideMenu: (state) => {
      state.isSidebarMenuOpen = false;
    },
  },
})

export const { openSideMenu, closeSideMenu } = uiSlice.actions

export default uiSlice.reducer