"use strict";

var _reducer = _interopRequireWildcard(require("../reducer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('reducer.js', function () {
  beforeEach(function () {
    (0, _reducer.resetProgressCounter)();
  });
  it('should return initial state', function () {
    expect((0, _reducer.default)(undefined, {})).toEqual({
      isActive: false,
      fetchStatus: {}
    });
  });
  it('should toggle progress on', function () {
    var state = {
      isActive: false,
      fetchStatus: {}
    };
    var action = {
      progressId: 'unique-id'
    };
    expect((0, _reducer.default)(state, action)).toEqual({
      isActive: true,
      fetchStatus: {
        'unique-id': 'loading'
      }
    });
  });
  it('should toggle progress off', function () {
    var state = {
      isActive: false,
      fetchStatus: {}
    };
    var action = {
      progressId: 'unique-id'
    }; // action to toggle on

    var reducedState = (0, _reducer.default)(state, action);
    expect((0, _reducer.default)(reducedState, action)).toEqual({
      isActive: false,
      fetchStatus: {
        'unique-id': 'loaded'
      }
    });
  });
});