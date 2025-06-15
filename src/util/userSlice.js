import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            const { uid, email, displayName, photoURL } = action.payload;
            return {
                uid,
                email,
                displayName,
                photoURL
            };
        },
        removeUser: (state, action) => {
            return null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;