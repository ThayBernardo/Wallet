// Coloque aqui suas actions

export const USER_INFO = 'USER_INFO';

const userInfo = (email) => ({
  type: USER_INFO,
  payload: email,
});

export default userInfo;
