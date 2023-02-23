export const Roles = {
  USER: { roleId: 0, roleName: 'user' },
  COACH: { roleId: 1, roleName: 'coach' },
  ADMIN: { roleId: 2, roleName: 'admin' },
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
