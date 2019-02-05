"use strict";

var _react = _interopRequireDefault(require("react"));

var _sinon = _interopRequireDefault(require("sinon"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _ProgressBarProvider = _interopRequireDefault(require("../ProgressBarProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clock = null;
describe('<ProgressBarProvier />', function () {
  beforeEach(function () {
    clock = _sinon.default.useFakeTimers();
  });
  afterEach(function () {
    clock.restore();
  });
  it('should render <ProgressBar />', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_ProgressBarProvider.default, null));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render progress bar with color name', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_ProgressBarProvider.default, {
      color: "red"
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render progress bar with color hex', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_ProgressBarProvider.default, {
      color: "#db7093"
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render progress bar with styles', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_ProgressBarProvider.default, {
      styles: {
        height: '5px'
      }
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render progress bar with className', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_ProgressBarProvider.default, {
      className: "my-custom-classname"
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});