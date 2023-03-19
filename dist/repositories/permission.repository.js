"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepository = void 0;
const repository_1 = require("@loopback/repository");
const __1 = require("..");
class PermissionRepository extends __1.TzCrudRepository {
    constructor(opts) {
        const { entityClass, dataSource } = opts;
        super(entityClass, dataSource);
        this.parent = this.createBelongsToAccessorFor('parent', repository_1.Getter.fromValue(this));
        this.registerInclusionResolver('parent', this.parent.inclusionResolver);
        this.children = this.createHasManyRepositoryFactoryFor('children', repository_1.Getter.fromValue(this));
        this.registerInclusionResolver('children', this.children.inclusionResolver);
    }
}
exports.PermissionRepository = PermissionRepository;
//# sourceMappingURL=permission.repository.js.map