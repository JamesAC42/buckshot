const CacheKeys = {

    VerificationCode: "buckshot:verification_code:", // :{user_id} string of verification code
    ForgotPasswordCode: "buckshot:forgot_password_code:", // :{user_id} string of forgot password code 

    InvalidInputFlags: "buckshot:invalid_input_flags:", // :{user_id} number indicating amount of times a request was made with invalid inputs

}

module.exports = CacheKeys;