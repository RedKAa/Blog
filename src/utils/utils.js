export const getLocalStorage = (name) => localStorage.getItem(name);
export const removeLocalStorage = (key) => localStorage.removeItem(key);
export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};
// localStorage user
export const setUserInfo = (userInfo) => setLocalStorage('USER_INFO', JSON.stringify(userInfo));
export const getUserInfo = () => {
  try {
    return JSON.parse(getLocalStorage('USER_INFO'))
  } catch (error) {
    return {}
  }
}
export const getTheme = () => {
  try {
    const user =  JSON.parse(getLocalStorage('USER_INFO'));
    console.log('mode',user);
    return user.mode;
  } catch (error) {
    return 'Light'
  }
}
export const removeUserInfo = () => localStorage.removeItem('USER_INFO');
// localStorage token
export const removeAppToken = (token) => localStorage.removeItem('APP_TOKEN');
export const setAppToken = (token) => {setLocalStorage('APP_TOKEN', token)};
export const getAppToken = () => getLocalStorage('APP_TOKEN');

export async function logOut() {
  deleteAllCookie();
  removeAppToken();
  removeUserInfo();
}


// get Cookie
export const setCookie = (cname, cvalue, expireDay = 10) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};


// set Cookie
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// delete all cookies
export const deleteAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

export const USER_DEFAULT_IMG = 'https://static.vecteezy.com/system/resources/previews/021/548/095/large_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg';