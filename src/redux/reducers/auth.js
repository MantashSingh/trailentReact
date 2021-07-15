import types from "../types";
import { clearUserData } from "../../utils/utils";

const initial_state = {
    userData: {},
    internetConnection: false

}

export default function (state = initial_state, action) {

    switch (action.type) {
        case types.LOGIN: {
            const data = action.payload
            return { userData: data };
        }
        case types.SET_PASSPHRASE: {
            const passphrase = action.payload
            console.log(passphrase , "redux state vala")
            return { ...state , passphrase : passphrase };
        }

        case types.NO_INTERNET: {
            const internetConnection = action.payload.internetConnection
            return { ...state, internetConnection }
        }
        case types.ON_LOGOUT: {
      
            clearUserData();
            console.log("data cleared ")
            
            return {...state, userData:{}};
          }

        default: {
            return { ...state }
        }
    }
}