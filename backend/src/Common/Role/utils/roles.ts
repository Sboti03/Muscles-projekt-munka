export const Roles = {
  USER: { roleId: 1, roleName: 'user' },
  COACH: { roleId: 2, roleName: 'coach' },
  ADMIN: { roleId: 3, roleName: 'admin' },
};

export type RoleType = {
  roleId: number
  roleName: string
}

export enum RoleEnum {
  USER= 'user',
  COACH = 'coach',
  ADMIN = 'admin'
}
