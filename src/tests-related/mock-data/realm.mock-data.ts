const realmBase = {
  id: 'cl0cmn6ks0000kkvxd8squcl5',
  name: 'master',
  display_name: 'Master',
  enabled: true,
  description: '',
  registration_allowed: false,
  reg_email_as_username: false,
  edit_username_allowed: false,
  reset_password_allowed: false,
  remember_me: false,
  verify_email: false,
  login_with_email_allowed: true,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  realm_smtp_config: [],
  client: [],
  user: [],
};
export const realmArray = [
  { ...realmBase },
  {
    ...realmBase,
    id: 'cl0cmn6ks0000kkvxd8squcl6',
    name: 'demo',
    display_name: 'Demo',
  },
  {
    ...realmBase,
    id: 'cl0cmn6ks0000kkvxd8squcl7',
    name: 'test',
    display_name: 'Test',
  },
];
export const oneRealm = realmArray[0];
export const db = {
  realm: {
    findMany: jest.fn().mockResolvedValue(realmArray),
    findUnique: jest.fn().mockResolvedValue(oneRealm),
    findFirst: jest.fn().mockResolvedValue(oneRealm),
    create: jest.fn().mockResolvedValue(oneRealm),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneRealm),
    delete: jest.fn().mockRejectedValue(oneRealm),
  },
};
