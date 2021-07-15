import store from '../store';
import {setUserData, apiPost, apiGet, clearUserData, apiPut} from '../../utils/utils';
import types from '../types';
import {
  EDIT_PROFILE,
  GENERATE_PASSPHRASE,
  LOGIN_API,
  SIGNUP_API,
  UPLOAD_PROFILE_IMAGE,
} from '../../config/urls.js';
const {dispatch} = store;
export  const saveUserData = data => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

const saveViewData = data => {
  dispatch({
    type: types.SAVE_VIEW_DATA,
    payload: data,
  });
};
// export function login(data) {
//   saveUserData(data);
//   // setUserData(data)
// }

export const updateInternetConnection = data => {
  dispatch({
    type: types.NO_INTERNET,
    payload: data,
  });
};

export const getPassphrase = () => {
  return apiPost(GENERATE_PASSPHRASE);
};

export const setPassphraseInReduxState = data => {
  console.log(data, 'data ');
  dispatch({
    type: types.SET_PASSPHRASE,
    payload: data,
  });
  
};

export const login = loginUrl => {
  return new Promise((resolve, reject) => {
    apiPost(loginUrl)
      .then(res => {
        setUserData(res.data).then(suc => {
          dispatch({
            type: types.LOGIN,
            payload: res.data,
          });
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const onLogout = () => {
  dispatch({
    type: types.ON_LOGOUT,
  });
};

export const editProfile = (passphase, query ,data) => {

  let url = EDIT_PROFILE+`${passphase}`+`?${query}`;
  console.log(url , "AUTH >>>>>")


  return apiPut(url,data);
};

 export const sendUrlToBackEnd = (id , url)=>{
 let link = EDIT_PROFILE+`${id}`+`?url=${url}`;
 console.log(link , "AUTH >>>>>")

 return apiGet(link);
 }

 export function uploadProfileImage(profile) {
  // fetch(UPLOAD_PROFILE_IMAGE,{
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   body: profile
  //   }).then(response => {
  //     console.log(response,  "image uploaded")
  //   }).catch(err => {
  //     console.log(err , "profile")
  //   })  
 
  
  return apiPost(UPLOAD_PROFILE_IMAGE , profile)
}











// export const login = (data) => {
//   console.log(data, 'the geiv ndart');
//   return new Promise((resolve, reject) => {
//     apiPost(LOGIN_API, data)
//       .then((res) => {
//         saveUserData(res.data);
//         setUserData(res.data).then((suc) => {
//           resolve(res);
//         });
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const signUp = (data) => {
//   console.log(data, 'the geiv ndart');
//   return new Promise((resolve, reject) => {
//     apiPost(SIGNUP_API, data)
//       .then((res) => {
//         saveUserData(res.data);
//         setUserData(res.data).then((suc) => {
//           resolve(res);
//         });
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const getViewData = (data) => {
//   console.log(data, 'the geiv ndart');
//   return new Promise((resolve, reject) => {
//     apiPost(VIEW_DATA)
//       .then((res) => {
//         console.log(res, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@-------');
//         saveViewData(res.data);
//         resolve(res);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
