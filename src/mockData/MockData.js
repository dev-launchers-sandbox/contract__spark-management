import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockData = () => {
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios);

  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  /*
  mock.onGet("/users").reply(200, {
    users: [
      {
        userName: "Alejandro",
        password: 54223
      },
      {
        userName: "Guillermo",
        password: 3333
      },
      {
        userName: "Kris",
        password: 4444
      },
      {
        userName: "Luis",
        password: 7777
      },
      {
        userName: "Eduardo",
        password: 79805
      },
      {
        userName: "Johan",
        password: 1111
      }
    ]
  });
  */

  mock.onGet("https://spark4community.com/Digital/Master/").reply(200, {});

  mock.onAny("/code_batch").reply((config) => {
    const data = config.data ? config.data : {};
    return [200, data];
  });
  mock.onPost("/clients").reply((config) => {
    const data = config.data ? config.data : {};
    return [200, data];
  });

  mock.onPost("/users").reply((config) => {
    const data = config.data ? config.data : {};
    return [200, data];
  });

  mock.onGet("/clients").reply(200, [
    {
      client: "AISD"
    },
    {
      client: "RRISD"
    },
    {
      client: "KIPP"
    },
    {
      client: "Radnom Client"
    },
    {
      client: "cool client"
    },
    {
      client: "LBJ"
    },
    {
      client: "idk any more districts lol"
    }
  ]);
};

export default mockData;
