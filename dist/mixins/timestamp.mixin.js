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
exports.TimestampMixin = void 0;
const repository_1 = require("@loopback/repository");
const TimestampMixin = (superClass) => {
    class Mixed extends superClass {
    }
    __decorate([
        (0, repository_1.property)({
            type: 'date',
            defaultFn: 'now',
            postgresql: {
                columnName: 'created_at',
                dataType: 'TIMESTAMPTZ',
            },
            hidden: true,
        }),
        __metadata("design:type", Date)
    ], Mixed.prototype, "createdAt", void 0);
    __decorate([
        (0, repository_1.property)({
            type: 'date',
            defaultFn: 'now',
            postgresql: {
                columnName: 'modified_at',
                dataType: 'TIMESTAMPTZ',
            },
            hidden: true,
        }),
        __metadata("design:type", Date)
    ], Mixed.prototype, "modifiedAt", void 0);
    return Mixed;
};
exports.TimestampMixin = TimestampMixin;
//# sourceMappingURL=timestamp.mixin.js.map