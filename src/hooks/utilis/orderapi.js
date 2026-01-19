import axios from "axios";
import Cookies from "universal-cookie";

function order() {
  const cookies = new Cookies();
  let token_data = cookies.get("User_Token_access");
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  if (Boolean(accessToken)) {
    token_data = accessToken;
  }
  const config = {
    headers: { Authorization: `Bearer ${token_data}` },
  };
  let data = axios.get(`http://127.0.0.1:1331/UserPanel/Get-Order/`, config);
  return data;
}
function PendingOrder() {
  const cookies = new Cookies();
  let token_data = cookies.get("User_Token_access");
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  if (Boolean(accessToken)) {
    token_data = accessToken;
  }
  const config = {
    headers: { Authorization: `Bearer ${token_data}` },
  };

  let data = axios.get(
    `http://127.0.0.1:1331/UserPanel/Get-GetPendingOrder/`,
    config
  );
  return data;
}

function OrderBYID(id) {
  const cookies = new Cookies();
  let token_data = cookies.get("User_Token_access");
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  if (Boolean(accessToken)) {
    token_data = accessToken;
  }
  const config = {
    headers: { Authorization: `Bearer ${token_data}` },
  };

  let data = axios.get(
    `http://127.0.0.1:1331/UserPanel/Get-GetOrderBYID/${id}`,
    config
  );
  return data;
}
function Cancel(id) {
  const cookies = new Cookies();
  let token_data = cookies.get("User_Token_access");
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  if (Boolean(accessToken)) {
    token_data = accessToken;
  }
  const config = {
    headers: { Authorization: `Bearer ${token_data}` },
  };

  let data = axios.post(
    `http://127.0.0.1:1331/UserPanel/Update-Order/${id}`,
    { Order_Status: "Cancel" },
    config
  );
  return data;
}

function GetCancelOrder() {
  const cookies = new Cookies();
  let token_data = cookies.get("User_Token_access");
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  if (Boolean(accessToken)) {
    token_data = accessToken;
  }
  const config = {
    headers: { Authorization: `Bearer ${token_data}` },
  };

  let data = axios.get(
    `http://127.0.0.1:1331/UserPanel/Get-GetCancelOrder/`,
    config
  );
  return data;
}

function GetDeliveredOrder() {
  const cookies = new Cookies();
  let token_data = cookies.get("User_Token_access");
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("User_Token_access");
  }
  if (Boolean(accessToken)) {
    token_data = accessToken;
  }
  const config = {
    headers: { Authorization: `Bearer ${token_data}` },
  };

  let data = axios.get(
    `http://127.0.0.1:1331/UserPanel/Get-GetDeliveredOrder/`,
    config
  );
  return data;
}
export {
  order,
  PendingOrder,
  OrderBYID,
  Cancel,
  GetCancelOrder,
  GetDeliveredOrder,
};
