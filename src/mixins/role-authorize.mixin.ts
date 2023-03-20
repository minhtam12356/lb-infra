import { MixinTarget } from '@loopback/core';
import { EntityResolver, hasMany } from '@loopback/repository';
import { User } from '@/models';
import { BaseIdEntity } from '@/base/base.model';

export const RoleAuthorizeMixin = <E extends MixinTarget<User>>(
  superClass: E,
  userResolver: EntityResolver<BaseIdEntity>,
  permissionResolver: EntityResolver<BaseIdEntity>,
  userRoleResolver: EntityResolver<BaseIdEntity>,
  permissionMappingResolver: EntityResolver<BaseIdEntity>,
) => {
  const UserEntity = userResolver();
  const PermissionEntity = permissionResolver();

  class Mixed extends superClass {
    @hasMany(userResolver, {
      through: {
        model: userRoleResolver,
        keyFrom: 'principalId',
        keyTo: 'userId',
      },
    })
    users: (typeof UserEntity)[];

    @hasMany(permissionResolver, {
      through: {
        model: permissionMappingResolver,
      },
    })
    permissions: (typeof PermissionEntity)[];
  }

  return Mixed;
};