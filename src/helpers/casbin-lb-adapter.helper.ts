import { FilteredAdapter, Model, Helper } from 'casbin';
import isEmpty from 'lodash/isEmpty';
import { BaseDataSource } from '@/base/base.datasource';
import { ApplicationLogger, LoggerFactory } from './logger.helper';

export class EnforcerDefinitions {
  static readonly ACTION_EXECUTE = 'execute';
  static readonly ACTION_READ = 'read';
  static readonly ACTION_WRITE = 'write';
  static readonly PREFIX_USER = 'user';
  static readonly PTYPE_USER = 'p';
  static readonly PREFIX_ROLE = 'role';
  static readonly PTYPE_ROLE = 'g';
}

export interface EnforcerFilterValue {
  principalType: string;
  principalValue: string | number | object;
}

// -----------------------------------------------------------------------------------------
export class CasbinLBAdapter implements FilteredAdapter {
  private logger: ApplicationLogger;

  constructor(private datasource: BaseDataSource) {
    this.logger = LoggerFactory.getLogger([CasbinLBAdapter.name]);
  }

  // -----------------------------------------------------------------------------------------
  async getRule(id: number, permissionId: number, pType: string): Promise<string | null> {
    let rs: (string | undefined)[] = [];

    switch (pType) {
      case EnforcerDefinitions.PTYPE_USER: {
        rs = [EnforcerDefinitions.PTYPE_USER, `${EnforcerDefinitions.PREFIX_USER}_${id}`];
        break;
      }
      case EnforcerDefinitions.PTYPE_ROLE: {
        rs = [EnforcerDefinitions.PTYPE_ROLE, `${EnforcerDefinitions.PREFIX_ROLE}_${id}`];
        break;
      }
      default: {
        break;
      }
    }

    if (rs.length < 2) {
      return null;
    }

    const permission = await this.datasource.execute(
      `SELECT id, code, name, FROM public."Permission" WHERE id = ${permissionId} `,
    );

    const permissionMapping = await this.datasource.execute(
      `SELECT id, user_id, role_id, permission_id FROM public."PermissionMapping" WHERE permission_id = ${permissionId}`,
    );
    rs = [...rs, permission.code, EnforcerDefinitions.ACTION_EXECUTE, permissionMapping.effect];
    return rs.join(',');
  }

  // -----------------------------------------------------------------------------------------
  getFilterCondition(filter: EnforcerFilterValue): string | null {
    let rs = null;
    if (!filter) {
      return rs;
    }

    const { principalType, principalValue } = filter;
    if (!principalValue) {
      return rs;
    }

    switch (principalType.toLowerCase()) {
      case 'role': {
        rs = `role_id = ${principalValue}`;
        break;
      }
      case 'user': {
        rs = `user_id = ${principalValue}`;
        break;
      }
      default: {
        break;
      }
    }

    return rs;
  }

  // -----------------------------------------------------------------------------------------
  async generatePolicyLine(rule: { userId: number; roleId: number; permissionId: number }) {
    const { userId, roleId, permissionId } = rule;
    let rs: string | null = '';

    if (userId) {
      rs = await this.getRule(userId, permissionId, EnforcerDefinitions.PTYPE_USER);
    } else if (roleId) {
      rs = await this.getRule(roleId, permissionId, EnforcerDefinitions.PTYPE_ROLE);
    }

    return rs;
  }

  // -----------------------------------------------------------------------------------------
  async loadFilteredPolicy(model: Model, filter: EnforcerFilterValue): Promise<void> {
    const whereCondition = this.getFilterCondition(filter);
    if (!whereCondition) {
      return;
    }

    const acls = await this.datasource.execute(`SELECT * FROM public."PermissionMapping" WHERE ${whereCondition}`);
    if (acls?.length <= 0) {
      return;
    }

    for (const acl of acls) {
      const policyLine = await this.generatePolicyLine(acl);
      if (!policyLine || isEmpty(policyLine)) {
        continue;
      }

      Helper.loadPolicyLine(policyLine, model);
      this.logger.info('[loadFilteredPolicy] Load new policy: ', policyLine);
    }
  }

  // -----------------------------------------------------------------------------------------
  isFiltered(): boolean {
    return true;
  }

  // -----------------------------------------------------------------------------------------
  async loadPolicy(model: Model): Promise<void> {
    const acls = await this.datasource.execute('SELECT * FROM public."PermissionMapping"');
    for (const acl of acls) {
      const policyLine = await this.generatePolicyLine(acl);
      if (!policyLine || isEmpty(policyLine)) {
        continue;
      }

      Helper.loadPolicyLine(policyLine, model);
      this.logger.info('[loadPolicy] Load new policy: ', policyLine);
    }
  }

  // -----------------------------------------------------------------------------------------
  async savePolicy(model: Model): Promise<boolean> {
    this.logger.info('[savePolicy] Ignore save policy method with options: ', { model });
    return true;
  }

  // -----------------------------------------------------------------------------------------
  async addPolicy(sec: string, ptype: string, rule: string[]): Promise<void> {
    this.logger.info('[addPolicy] Ignore add policy method with options: ', { sec, ptype, rule });
  }

  // -----------------------------------------------------------------------------------------
  async removePolicy(sec: string, ptype: string, rule: string[]): Promise<void> {
    this.logger.info('[removePolicy] Ignore remove policy method with options: ', { sec, ptype, rule });
  }

  // -----------------------------------------------------------------------------------------
  async removeFilteredPolicy(sec: string, ptype: string, fieldIndex: number, ...fieldValues: string[]): Promise<void> {
    switch (ptype) {
      case EnforcerDefinitions.PTYPE_USER: {
        // Remove user policy
        break;
      }
      case EnforcerDefinitions.PTYPE_ROLE: {
        // Remove role policy
        break;
      }
      default: {
        break;
      }
    }

    this.logger.info('[removeFilteredPolicy] Ignore remove filtered policy method with options: ', {
      sec,
      ptype,
      fieldIndex,
      fieldValues,
    });
  }
}