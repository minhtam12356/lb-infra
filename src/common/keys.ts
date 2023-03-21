export class AuthorizerKeys {
  static readonly APPLICATION_NAME = '@app/authorize/component/application_name';

  // -----------------------------------------------------------------------------
  static readonly ROLE_MODEL = '@app/authorize/component/models/user';
  static readonly PERMISSION_MODEL = '@app/authorize/component/models/permission';
  static readonly PERMISSION_MAPPING_MODEL = '@app/authorize/component/models/permission_mapping';
  static readonly USER_ROLE_MODEL = '@app/authorize/component/models/user_role';
  
  // -----------------------------------------------------------------------------
  static readonly ROLE_REPOSITORY = '@app/authorize/component/repositories/user';
  static readonly PERMISSION_REPOSITORY = '@app/authorize/component/repositories/permission';
  static readonly PERMISSION_MAPPING_REPOSITORY = '@app/authorize/component/repositories/permission_mapping';
  static readonly USER_ROLE_REPOSITORY = '@app/authorize/component/repositories/user_role';

  // -----------------------------------------------------------------------------
  static readonly PROVIDER = '@app/authorize/provider';
  static readonly ENFORCER = '@app/authorize/enforcer';
  static readonly ADAPTER_DATASOURCE = '@app/authorize/enforcer/adapter/datasource';
  static readonly CONFIGURE_PATH = '@app/authorize/configure_path';
}
