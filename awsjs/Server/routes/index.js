"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./already-read.router"), exports);
__exportStar(require("./api.router"), exports);
__exportStar(require("./auth.router"), exports);
__exportStar(require("./authors.router"), exports);
__exportStar(require("./books.router"), exports);
__exportStar(require("./comments.router"), exports);
__exportStar(require("./favorites.router"), exports);
__exportStar(require("./genres.router"), exports);
__exportStar(require("./ratings.router"), exports);
__exportStar(require("./users.router"), exports);
__exportStar(require("./views.router"), exports);
__exportStar(require("./will-read.router"), exports);
//# sourceMappingURL=index.js.map