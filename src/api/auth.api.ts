import axiosInstance from "./axios";

export const preAuthHandshake = async (devicePublicKey: string = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQUxmQUp0Uy9ZcjVWSCtNUTVUZmkvTG1zNUZldDNMM3g2SUNYMW9zME15RWpjUC9ldmFGdFYrZkJOTTBKRG5WQ3h3alZwRkNHaElybkt1S3d1Y2pUUndrQ0F3RUFBUT09DQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0=") => {
  const res = await axiosInstance.post(
    "/v1/api/auth/pre-auth-handshake",
    {devicePublicKey: devicePublicKey}
  );
  return res.data;
};

export const login = async (data: {
  username: string;
  password: string;
}) => {
  const res = await axiosInstance.post(
    "/v1/api/auth/login",
    data
  );
  return res.data;
};

export const validateOTP = async (data: {
  username: string;
  otp: number;
}) => {
  const res = await axiosInstance.post(
    "/v2/api/auth/validate-otp",
    data
  );
  return res.data;
};

export const authenticateOTP = async (data: {
  username: string;
  otp: number;
  isUserBlocked: boolean;
}) => {
  const res = await axiosInstance.post(
    "/v1/api/auth/authenticate-otp",
    data
  );
  return res.data;
};

export const forgotUserID = async (data:{
  panNumber: string,
  emailId: string
}) => {
  const res = await axiosInstance.post(
    "/v1/api/auth/forgot-user-id", data
  );

  return res.data;
};


export const forgotPassword = async (data:{
  panNumber: string,
  username: string
}) => {
  const res = await axiosInstance.post(
    "/v1/api/auth/forgot-password", data
  );

  return res.data;
};

export const logout = async () => {
  await axiosInstance.get("/v1/api/auth/logout");
}