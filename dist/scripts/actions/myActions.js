define(['exports', '../myAlt'], function (exports, _myAlt) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _myAlt2 = _interopRequireDefault(_myAlt);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var SomeActions = function () {
        function SomeActions() {
            _classCallCheck(this, SomeActions);
        }

        _createClass(SomeActions, [{
            key: 'updateCurrentColor',
            value: function updateCurrentColor(color) {
                return color;
            }
        }]);

        return SomeActions;
    }();

    exports.default = _myAlt2.default.createActions(SomeActions);
});