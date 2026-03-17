import axiosInstance from "./axios";

export interface loginPayload {
    username: string, 
    password: string
}

export interface validateOTPPayload {
    username: string, 
    otp: number
}

// export interface forgotPasswordPayload {
//     panNumber: string,
//     username: string
// }

export const preAuthHandshake = async(devicePublicKey: string = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQUxmQUp0Uy9ZcjVWSCtNUTVUZmkvTG1zNUZldDNMM3g2SUNYMW9zME15RWpjUC9ldmFGdFYrZkJOTTBKRG5WQ3h3alZwRkNHaElybkt1S3d1Y2pUUndrQ0F3RUFBUT09DQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0=") => {
    const response = await axiosInstance.post('/v1/api/auth/pre-auth-handshake', {
        devicePublicKey : devicePublicKey
    })

    return response.data;
}

export const login = async(data: loginPayload) => {
    const response = await axiosInstance.post('/v1/api/auth/login', data)

    return response.data;
}

export const validateOTP = async(data: validateOTPPayload) => {
    const response = await axiosInstance.post('/v2/api/auth/validate-otp', data)

    return response.data;
}

export const forgotPassword = async(panNumber: string = "AMITH1234A", username: string = "AMITH1") => {
    const response = await axiosInstance.post('/v1/api/auth/forgot-password', {
        panNumber: panNumber,
        username: username
    })

    return response.data;
}