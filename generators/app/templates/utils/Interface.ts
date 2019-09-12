import axios from "axios";
export default class Interface {
  public static get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          return resolve(response.data);
        }).catch((reason) => {
          return reject(reason);
        });
    });
  }
  public static post(url: string, param?: any, ContentType: string = "application/json;charset=UTF-8", timeout = 10000): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        url,
        method: 'post',
        data: param,
        timeout,
        headers: {
          "Content-Type": ContentType
        }
      })
        .then((response) => {
          return resolve(response.data);
        })
        .catch((reason) => {
          return reject(reason);
        });
    });
  }
  public static Test = {
    async post() {
      try {
        return await Interface.post("/hello",{
          name:"minar"
        });
      } catch (error) {

      }
    }
  }
}
