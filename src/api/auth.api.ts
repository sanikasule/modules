import axiosInstance from "./axios";

export const preAuthHandshake = async(devicePublicKey: string = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQUxmQUp0Uy9ZcjVWSCtNUTVUZmkvTG1zNUZldDNMM3g2SUNYMW9zME15RWpjUC9ldmFGdFYrZkJOTTBKRG5WQ3h3alZwRkNHaElybkt1S3d1Y2pUUndrQ0F3RUFBUT09DQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0=") => {
    const response = await axiosInstance.post('/v1/api/auth/pre-auth-handshake', {
        devicePublicKey : devicePublicKey
    })

    return response.data;
}

export const login = async(username: string, password: string) => {
    const response = await axiosInstance.post('/v1/api/auth/login', {
        username: username,
        password: password
    })

    return response.data;
}

export const validateOTP = async(username:string, otp: number) => {
    const response = await axiosInstance.post('v2/api/auth/validate-otp', {
        username: username,
        otp: otp
    })

    return response.data;
}