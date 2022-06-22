export const userArray = [
  {
    id: 'cl0cmn6l90007kkvxomdrgvo4',
    email: 'tetravaal.system@gmail.com',
    enabled: true,
    username: 'admin',
    is_admin: false,
    name: 'demo_1',
    avatar_dirname: null,
    phone: null,
    organization: null,
    subscribe_to_own_cards: false,
    is_two_factor_authentication_enabled: false,
  },
  {
    id: 'cl0cmn6l90007kkvxomdrgvo5',
    email: 'demo_2@demo.com',
    enabled: true,
    username: 'demo_2',
    is_admin: false,
    name: 'demo_2',
    avatar_dirname: null,
    phone: null,
    organization: null,
    subscribe_to_own_cards: false,
    is_two_factor_authentication_enabled: false,
  },
  {
    id: 'cl0cmn6l90007kkvxomdrgvo6',
    email: 'demo_3@demo.com',
    enabled: true,
    username: 'demo_3',
    is_admin: false,
    name: 'demo_3',
    avatar_dirname: null,
    phone: null,
    organization: null,
    subscribe_to_own_cards: false,
    is_two_factor_authentication_enabled: false,
  },
];

export const oneUser = userArray[0];

export const db = {
  user: {
    findMany: jest.fn().mockResolvedValue(userArray),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    findFirst: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(userArray),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneUser),
    delete: jest.fn().mockResolvedValue(oneUser),
  },
};
