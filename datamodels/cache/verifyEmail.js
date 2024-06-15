const CacheKeys = require("../../CacheKeys");

const setVerificationCode = async (cache, userid, code) => {

    return new Promise(async (resolve, reject) => {
        try {
            cache.set(CacheKeys.VerificationCode + userid, code, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch(err) {
            reject(err);
        }
    });
    
}

const verifyEmailCode = async (cache, userid, checkCode) => {

    return new Promise(async (resolve, reject) => {
        try {
            cache.get(CacheKeys.VerificationCode + userid, (error, code) => {
                if(error) {
                    reject(error);
                    return;
                }
                if(!code) resolve(false);
                if(code === checkCode) {
                    cache.del(CacheKeys.VerificationCode + userid);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        } catch(err) {
            reject(err);
        }
    })

}

const setPasswordResetCode = async (cache, userid, code) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            cache.set(CacheKeys.ForgotPasswordCode + userid, code, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch(err) {
            reject(err);
        }
    });

}

const alreadyHasPasswordResetCode = async (cache, userid) => {
    return new Promise((resolve, reject) => {
        try {
            cache.get(CacheKeys.ForgotPasswordCode + userid, (error, code) => {
                if(error) {
                    reject(error);
                    return;
                }
                if(code) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        } catch(err) {
            reject(err);
        }
    });
}

const checkPasswordResetCode = async (cache, userid, checkCode) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            cache.get(CacheKeys.ForgotPasswordCode + userid, (getPwErr, code) => {
                if(getPwErr) {
                    reject(getPwErr);
                    return;
                }
                if(!code) {
                    reject("User has not requested a password reset.");
                } else {
                    if(code === checkCode) {
                        cache.del(CacheKeys.ForgotPasswordCode + userid, (err) => {
                            if(err) {
                                reject(err);
                                return;
                            }
                            resolve(true);
                        });
                    } else {
                        resolve(false);
                    }
                }
            });
        } catch(err) {
            reject(err);
        }
    });

}

module.exports = {
    setVerificationCode,
    verifyEmailCode,
    alreadyHasPasswordResetCode,
    setPasswordResetCode,
    checkPasswordResetCode
}