export const API_BASE_URL="http://15.184.181.58";

export const getApiUrl=(endpoint)=>`${API_BASE_URL}${endpoint}`

export const GENERATE_PASSPHRASE=getApiUrl("/api/user/generate-passphase");
export const SIGNUP_API=getApiUrl("/signup")
export const EDIT_PROFILE = getApiUrl("/api/user/profile/")
export const UPLOAD_PROFILE_IMAGE = getApiUrl("/api/user/upload-profile-image")
