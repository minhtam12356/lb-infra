"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineUserRole = exports.definePermissionMapping = exports.definePermission = exports.defineRole = void 0;
const repository_1 = require("@loopback/repository");
const base_1 = require("../base");
const mixins_1 = require("../mixins");
const common_1 = require("../common");
// -----------------------------------------------------------------------
const defineRole = (opts) => {
    const { userRosolver, permissionRosolver, userRoleResolver, permissionMappingRosolver } = opts;
    const UserEntity = userRosolver();
    const PermissionEntity = userRosolver();
    class Role extends base_1.BaseTzEntity {
        constructor(data) {
            super(data);
        }
    }
    __decorate([
        (0, repository_1.property)({
            type: 'string',
            require: true,
        }),
        __metadata("design:type", String)
    ], Role.prototype, "identifier", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
            require: true,
        }),
        __metadata("design:type", String)
    ], Role.prototype, "name", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
        }),
        __metadata("design:type", String)
    ], Role.prototype, "description", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'number',
        }),
        __metadata("design:type", Number)
    ], Role.prototype, "priority", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
            default: common_1.RoleStatuses.ACTIVATED,
        }),
        __metadata("design:type", String)
    ], Role.prototype, "status", void 0);
    __decorate([
        (0, repository_1.hasMany)(userRosolver, {
            through: {
                model: userRoleResolver,
                keyFrom: 'principalId',
                keyTo: 'userId',
            },
        }),
        __metadata("design:type", Array)
    ], Role.prototype, "users", void 0);
    __decorate([
        (0, repository_1.hasMany)(permissionRosolver, {
            through: {
                model: permissionMappingRosolver,
            },
        }),
        __metadata("design:type", Array)
    ], Role.prototype, "permissions", void 0);
    return Role;
};
exports.defineRole = defineRole;
// -----------------------------------------------------------------------
const definePermission = () => {
    class Permission extends base_1.BaseTzEntity {
        constructor(data) {
            super(data);
        }
    }
    __decorate([
        (0, repository_1.property)({
            type: 'string',
        }),
        __metadata("design:type", String)
    ], Permission.prototype, "code", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
        }),
        __metadata("design:type", String)
    ], Permission.prototype, "name", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
        }),
        __metadata("design:type", String)
    ], Permission.prototype, "subject", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
            postgresql: { columnName: 'p_type' },
        }),
        __metadata("design:type", String)
    ], Permission.prototype, "pType", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'string',
        }),
        __metadata("design:type", String)
    ], Permission.prototype, "action", void 0);
    __decorate([
        (0, repository_1.belongsTo)(() => Permission, { keyFrom: 'parentId' }, { name: 'parent_id' }),
        __metadata("design:type", Number)
    ], Permission.prototype, "parentId", void 0);
    __decorate([
        (0, repository_1.hasMany)(() => Permission, { keyTo: 'parentId' }),
        __metadata("design:type", Array)
    ], Permission.prototype, "children", void 0);
    return Permission;
};
exports.definePermission = definePermission;
// -----------------------------------------------------------------------
const definePermissionMapping = (opts) => {
    const { userRosolver, roleResolver, permissionResolver } = opts;
    class PermissionMapping extends base_1.BaseTzEntity {
        constructor(data) {
            super(data);
        }
    }
    __decorate([
        (0, repository_1.belongsTo)(userRosolver, { keyFrom: 'userId' }, { name: 'user_id' }),
        __metadata("design:type", Number)
    ], PermissionMapping.prototype, "userId", void 0);
    __decorate([
        (0, repository_1.belongsTo)(roleResolver, { keyFrom: 'roleId' }, { name: 'role_id' }),
        __metadata("design:type", Number)
    ], PermissionMapping.prototype, "roleId", void 0);
    __decorate([
        (0, repository_1.belongsTo)(permissionResolver, { keyFrom: 'permissionId' }, { name: 'permission_id' }),
        __metadata("design:type", Number)
    ], PermissionMapping.prototype, "permissionId", void 0);
    __decorate([
        (0, repository_1.property)({ type: 'string' }),
        __metadata("design:type", String)
    ], PermissionMapping.prototype, "effect", void 0);
    return PermissionMapping;
};
exports.definePermissionMapping = definePermissionMapping;
// -----------------------------------------------------------------------
const defineUserRole = (userRosolver) => {
    class UserRole extends (0, mixins_1.PrincipalMixin)(base_1.BaseTzEntity, 'Role') {
        constructor(data) {
            super(data);
        }
    }
    __decorate([
        (0, repository_1.belongsTo)(userRosolver, { keyFrom: 'userId' }, {
            postgresql: {
                columnName: 'user_id',
            },
        }),
        __metadata("design:type", Number)
    ], UserRole.prototype, "userId", void 0);
    return UserRole;
};
exports.defineUserRole = defineUserRole;
//# sourceMappingURL=authorize.model.js.map