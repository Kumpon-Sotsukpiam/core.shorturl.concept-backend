/**
 *
 *  JWT_ACCESS_SECRET=access-security-key
 *  JWT_REFRESH_SECRET=refresh-security-key
 *  JWT_ACCESS_EXPIRATION_TIME=600
 *  JWT_REFRESH_EXPIRATION_TIME=600
 *  BCRYPT_SALT_OR_ROUND=10
 */

export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_ACCESS_SECRET':
        return 'access-security-key-for-testing';
      case 'JWT_REFRESH_SECRET':
        return 'refresh-security-key-for-testing';
      case 'JWT_ACCESS_EXPIRATION_TIME':
        return 60;
      case 'JWT_REFRESH_EXPIRATION_TIME':
        return 60;
      case 'BCRYPT_SALT_OR_ROUND':
        return 10;
    }
  },
};
