"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class ViewsSchema extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({
        default: 0, unique: false, required: true, type: () => Number,
    })
], ViewsSchema.prototype, "views", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true, unique: false, default: 0, type: () => Number,
    })
], ViewsSchema.prototype, "unique_views", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true, unique: false, default: 0, type: () => Number,
    })
], ViewsSchema.prototype, "auth_views", void 0);
exports.ViewsModel = (0, typegoose_1.getModelForClass)(ViewsSchema, {
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
});
//# sourceMappingURL=views.model.js.map