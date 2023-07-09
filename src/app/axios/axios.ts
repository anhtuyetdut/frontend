import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseURL = 'http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000';

const instance = axios.create({
  baseURL: baseURL,
  params: {}
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  let exp: number;
  if (token) {
    const decode: any = jwt_decode(token);
    exp = decode.exp;
    const time = new Date();
    let requesttime: number = Math.round(time.getTime() / 1000);
    const refreshtoken = localStorage.getItem('refreshToken');
    if (exp - requesttime < 15) {
      await axios
        .get(`${baseURL}/accounts/refresh`, {
          headers: {
            Authorization: 'Bearer ' + refreshtoken
          }
        })
        .then((response) => {
          const listTokens = response.data;
          instance.defaults.headers.common['Authorization'] = `Bearer ${listTokens.data.token}`;
          localStorage.setItem('token', listTokens.data.token);
          localStorage.setItem('refreshToken', listTokens.data.refreshToken);
        })
        .catch((error) => error);
    }
  }
  return config;
});

export default instance;
