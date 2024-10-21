import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonStyles {
  backgroundColor: string;
  color: string;
  font: string;
}

interface ComponentData {
  type: string;
  content: string;
  styles?: any;
}

export interface CanvasState {
  siteName: string;
  commonStyles: CommonStyles;
  components: Record<string, ComponentData>;
  canvas: string[]; 
}

const initialState: CanvasState = {
  siteName: 'DummyName',
  commonStyles: {
    backgroundColor: '',
    color: '',
    font: ''
  },
  components: {},
  canvas: []
}

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    updateSiteName: (state, action: PayloadAction<string>) => {
      state.siteName = action.payload;
    },

    updateCommonStyles: (
      state,
      action: PayloadAction<Partial<CommonStyles>>
    ) => {
      const { backgroundColor, color, font } = action.payload;
      state.commonStyles.backgroundColor = backgroundColor ?? state.commonStyles.backgroundColor;
      state.commonStyles.color = color ?? state.commonStyles.color;
      state.commonStyles.font = font ?? state.commonStyles.font;
    },

    updateComponent: (
      state,
      action: PayloadAction<{ id: string; componentData: ComponentData }>
    ) => {
      const { id, componentData } = action.payload;
      state.components[id] = componentData;
    },

    removeComponent: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.components[id];
    },

    updateCanvas: (state, action: PayloadAction<string[]>) => {
      state.canvas = action.payload;
    },

    addToCanvas: (state, action: PayloadAction<string>) => {
      state.canvas.push(action.payload);
    },

    removeFromCanvas: (state, action: PayloadAction<number>) => {
      state.canvas.splice(action.payload, 1);
    },

    reorderCanvas: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [movedItem] = state.canvas.splice(startIndex, 1);
      state.canvas.splice(endIndex, 0, movedItem);
    },
  },
});

export const {
  updateSiteName,
  updateCommonStyles,
  updateComponent,
  removeComponent,
  updateCanvas,
  addToCanvas,
  removeFromCanvas,
  reorderCanvas,
} = canvasSlice.actions;

export default canvasSlice.reducer;
