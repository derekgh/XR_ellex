import { create } from 'zustand';

const useStore = create((set) => ({
  keyState: {
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
  },
  setKeyState: (key, value) => set((state) => ({
    keyState: {
      ...state.keyState,
      [key]: value,
    },
  })),
}));

export default useStore;
