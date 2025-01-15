import axios from "axios";
const { PUBLIC_SERVER_URL } = require('../api');
const host = PUBLIC_SERVER_URL;

class UserServices {

  async getAllCities() {
    try {
      const response = await axios.get(`${host}/api/user/getAllCities`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,                        //to include cookies or authorization headers for the request
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {error : true, message : err.response.data.message}
    }
  };

  async getSearchBus(reqData) {
    // console.log("🚀 ~ UserServices ~ getSearchBus ~ reqData:", reqData)  
    try {
      const response = await axios.get(`${host}/api/user/getSearchBus`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: reqData,
        withCredentials: true,                        //to include cookies or authorization headers for the request
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {error : true, message : err.response.data.message}
    } 
  };
  
  async getPNR(reqData) {
    try {
      const response = await axios.get(`${host}/api/user/getPNR`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: reqData,
        withCredentials: true,                        //to include cookies or authorization headers for the request
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {error : true, message : err.response.data.message}
    } 
  };

  async postBookTicket(reqData){
    console.log("🚀 ~ UserServices ~ postBookTicket ~ reqData:", reqData)
    try{
      const response = await axios.post(`${host}/api/user/postBookTicket`, reqData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,                        //to include cookies or authorization headers for the request
      });
      return response.data;
    }catch(err){
      console.error(err);
      return {error : true, message : err.response.data.message}
    }

  }


}

const userServicesInstance = new UserServices();
export default userServicesInstance;

