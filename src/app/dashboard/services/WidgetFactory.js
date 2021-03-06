var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var WidgetModel_1 = require("../models/WidgetModel");
var DataSources_1 = require("./DataSources");
var WidgetFactory = (function () {
    function WidgetFactory(http, dataSources) {
        this.http = http;
        this.dataSources = dataSources;
    }
    WidgetFactory.prototype.createWidget = function (widgetConfig) {
        return new WidgetModel_1.WidgetModel(this.http, this.dataSources, widgetConfig);
    };
    WidgetFactory = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, DataSources_1.DataSources])
    ], WidgetFactory);
    return WidgetFactory;
})();
exports.WidgetFactory = WidgetFactory;
//# sourceMappingURL=WidgetFactory.js.map