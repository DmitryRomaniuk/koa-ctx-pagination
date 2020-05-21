"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var index_1 = require("../index");
describe('Tests', function () {
    var orders = [
        new index_1.Order('propertyA', index_1.Direction.asc),
        new index_1.Order('propertyB', index_1.Direction.desc),
        new index_1.Order('propertyC', index_1.Direction.asc),
        new index_1.Order('propertyD', index_1.Direction.desc),
        new index_1.Order('propertyE', index_1.Direction.desc),
    ];
    var pageOrders = [
        new index_1.Order('firstName', index_1.Direction.asc),
        new index_1.Order('lastName', index_1.Direction.asc),
    ];
    var content = [
        { id: 1, firstName: 'Bob', lastName: 'Stevens' },
        { id: 2, firstName: 'Steve', lastName: 'Bobbins' },
        { id: 3, firstName: 'Robert', lastName: 'Stevenson' },
        { id: 4, firstName: 'Stevarino', lastName: 'Robertson' },
    ];
    describe('Order class', function () {
        it('returns "asc" for the static _DEFAULT_DIRECTION class property', function () {
            expect(index_1.Order._DEFAULT_DIRECTION).toEqual('asc');
        });
        it('instance.direction returns "asc" if no direction is specified in constructor', function () {
            var order = new index_1.Order('testProp');
            expect(order.direction).toEqual('asc');
        });
        it('instance.direction returns "desc" if direction parameter exactly matches "desc" in constructor', function () {
            var order = new index_1.Order('testProp', index_1.Direction.desc);
            expect(order.direction).toEqual('desc');
        });
    });
    describe('Sort class', function () {
        it('instance.toJSON() method result matches snapshot', function () {
            var sort = new index_1.Sort(orders);
            expect(sort.toJSON()).toMatchSnapshot();
        });
        it('iterates over orders using for...of loop', function () {
            var sort = new index_1.Sort(orders);
            var result = [];
            for (var _i = 0, _a = sort.toJSON(); _i < _a.length; _i++) {
                var order = _a[_i];
                result.push(order);
            }
            expect(result).toMatchSnapshot();
        });
        it('instance.forEach() method result matches snapshot', function () {
            var sort = new index_1.Sort(orders);
            var valueGroups = {
                properties: [],
                directions: []
            };
            var iteratee = function (property, direction) {
                valueGroups.properties.push(property);
                valueGroups.directions.push(direction);
            };
            sort.forEach(iteratee);
            expect(valueGroups).toMatchSnapshot();
        });
    });
    describe('Pageable class', function () {
        it('default values match snapshot when constructor parameters are undefined', function () {
            var pageable = new index_1.Pageable();
            expect(pageable).toMatchSnapshot();
        });
        [
            { value: 'singleValue', type: 'string' },
            {
                value: ['valueA', 'valueB:desc', 'valueC:desc'],
                type: 'array of strings'
            },
            { value: new index_1.Sort(orders.slice(1, 3)), type: 'sort' },
        ].forEach(function (_a) {
            var value = _a.value, type = _a.type;
            it("returns a valid Sort instance when a value of type " + type + " is passed to the constructor", function () {
                var pageable = new index_1.Pageable(1, 10, true, value);
                expect(pageable.sort).toMatchSnapshot();
            });
        });
        it('disregards extra commas in the sort array passed in as a parameter', function () {
            var _a;
            var invalidSort = ['valueA,', 'valueB,,', 'valueC,,,'];
            var result = new index_1.Pageable(0, 20, false, invalidSort);
            var invalidValues = (_a = result.sort) === null || _a === void 0 ? void 0 : _a.orders.filter(function (order) { return order.property.length === 0; });
            expect(invalidValues).toHaveLength(0);
        });
        it('disregards extra colons in the sort array passed in as a parameter', function () {
            var _a;
            var invalidSort = [
                'valueA:desc',
                'valueB::desc',
                'valueC::::desc',
            ];
            var pageable = new index_1.Pageable(0, 20, false, invalidSort);
            var invalidValues = (_a = pageable.sort) === null || _a === void 0 ? void 0 : _a.orders.filter(function (order) { return order.property.length === 0; });
            expect(invalidValues).toHaveLength(0);
        });
    });
    describe('ArrayPage class', function () {
        var getValidPage = function () {
            var sort = new index_1.Sort(pageOrders);
            var pageable = new index_1.Pageable(0, 20, false, sort);
            return new index_1.ArrayPage(content, 2, pageable);
        };
        it('matches snapshot when valid parameters are passed to the constructor', function () {
            var result = getValidPage();
            expect(result).toMatchSnapshot();
        });
        it('results of instance.map() method result matches snapshot', function () {
            var page = getValidPage();
            var result = page.map(function (pageContent, idx) { return (__assign(__assign({}, pageContent), { age: idx * 5 })); });
            expect(result).toMatchSnapshot();
        });
    });
    describe('IndexedPage class', function () {
        var getValidIndexedPage = function () {
            var sort = new index_1.Sort(pageOrders);
            var pageable = new index_1.Pageable(0, 20, false, sort);
            var ids = [1, 2];
            var index = content.reduce(function (acc, record) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[record.id] = record, _a)));
            }, {});
            return new index_1.IndexedPage(ids, index, 2, pageable);
        };
        it('matches snapshot when valid parameters are passed to the constructor', function () {
            var result = getValidIndexedPage();
            expect(result).toMatchSnapshot();
        });
        it('results of instance.map() method result matches snapshot', function () {
            var page = getValidIndexedPage();
            var result = page.map(function (pageContent, idx) { return (__assign(__assign({}, pageContent), { age: idx * 5 })); });
            expect(result).toMatchSnapshot();
        });
    });
    describe('IndexablePage class', function () {
        var getValidIndexablePage = function (isIndexed) {
            if (isIndexed === void 0) { isIndexed = false; }
            var sort = new index_1.Sort(pageOrders);
            var pageable = new index_1.Pageable(0, 20, isIndexed, sort);
            return new index_1.IndexablePage(content, 2, pageable);
        };
        it('matches snapshot when valid parameters are passed to the constructor', function () {
            var result = getValidIndexablePage();
            expect(result).toMatchSnapshot();
        });
        it('results of instance.map() method result matches snapshot', function () {
            var page = getValidIndexablePage();
            var result = page.map(function (pageContent, idx) { return (__assign(__assign({}, pageContent), { age: idx * 5 })); });
            expect(result).toMatchSnapshot();
        });
        it('instance.toJSON() method result matches snapshot', function () {
            var page = getValidIndexablePage(true);
            var result = page.toJSON();
            expect(result).toMatchSnapshot();
        });
    });
    describe('paginate function', function () {
        var next = function () { };
        var context = {
            query: {
                page: 1,
                size: 20,
                sort: 'firstName',
                indexed: 'true'
            },
            state: {}
        };
        it('context.state matches snapshot when paginate is called with valid context', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.paginate(context, next)];
                    case 1:
                        _a.sent();
                        expect(context.state).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('context.state matches snapshot when paginate is called with string values for page and size', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedQuery = __assign(__assign({}, context.query), { page: '10', size: '15' });
                        return [4 /*yield*/, index_1.paginate(__assign(__assign({}, context), { query: updatedQuery }), next)];
                    case 1:
                        _a.sent();
                        expect(context.state).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('context.state matches snapshot when paginate is called with empty strings for page and size', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedQuery = __assign(__assign({}, context.query), { page: '', size: '' });
                        return [4 /*yield*/, index_1.paginate(__assign(__assign({}, context), { query: updatedQuery }), next)];
                    case 1:
                        _a.sent();
                        expect(context.state).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('context.state matches snapshot when paginate is called with undefined page, size, and sort', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedQuery = { indexed: 'true' };
                        return [4 /*yield*/, index_1.paginate(__assign(__assign({}, context), { query: updatedQuery }), next)];
                    case 1:
                        _a.sent();
                        expect(context.state).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws error when paginate is called with invalid values for page and size', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedQuery, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedQuery = __assign(__assign({}, context.query), { page: 'page', size: 'size' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.paginate(__assign(__assign({}, context), { query: updatedQuery }), next)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.name).toBe('NumberFormatError');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('throws error when invalid sort direction is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedQuery, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedQuery = __assign(__assign({}, context.query), { sort: 'firstName:foo' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, index_1.paginate(__assign(__assign({}, context), { query: updatedQuery }), next)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.name).toBe('InvalidSortError');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
