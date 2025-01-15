import axios from "axios";
const { PUBLIC_SERVER_URL } = require('../api');

const host = PUBLIC_SERVER_URL;

class AdminServices {

  async postAddNewBus(reqData) {
    // console.log("🚀 ~ AddBusService ~ addNewBus ~ reqData:", reqData)
    try {
      const response = await axios.post(`${host}/api/admin/addNewBus`, reqData, {
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
  }
}

const adminServicesInstance = new AdminServices();
export default adminServicesInstance;


