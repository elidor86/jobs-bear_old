import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// Importing createJSONStorage to create a custom storage engine
import {createJSONStorage} from 'zustand/middleware';

// Define your custom storage using createJSONStorage for localStorage
const storage = createJSONStorage(() => localStorage);

const incrementClickCount = (state, src) => {
    const currentCount = state.clickCountBySrc[src] || 0;
    //debugger
    return {
        ...state.clickCountBySrc,
        [src]: currentCount + 1
    };
};

const useGlobalStore = create(persist(
    (set) => ({
        clickCountBySrc: {},
        incrementClickCountBySrc: (src) => set((state) => ({
            clickCountBySrc: incrementClickCount(state, src)
        })),
        setGlobalState: (key, value) => set((state) => ({
            ...state, [key]: value
        })),
    }),
    {
        name: 'global-store',
        getStorage: () => storage,
    }
));

export default useGlobalStore;
