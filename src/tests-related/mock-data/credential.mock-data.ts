import { oneUser } from './users.mock-data';
export const credentialArray = [
  {
    type: 'password',
    user: oneUser.id,
    secret_data: {
      value:
        '$argon2i$v=19$m=4096,t=3,p=1$SpvW/ig6D8mWirSBPNEiAQ$smdjJcwRz+TGUFFw5D3qriv2f5/nG3RXNuHEkJ6uUWQ',
    },
    credential_data: {},
  },
];
export const oneCredential = credentialArray[0];

export const db = {
  credential: {
    findMany: jest.fn().mockResolvedValue(credentialArray),
    findUnique: jest.fn().mockResolvedValue(oneCredential),
    findFirst: jest.fn().mockResolvedValue(oneCredential),
    create: jest.fn().mockReturnValue(credentialArray),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneCredential),
    delete: jest.fn().mockResolvedValue(oneCredential),
  },
};
