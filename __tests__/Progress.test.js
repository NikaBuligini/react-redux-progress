"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _Progress = _interopRequireDefault(require("../Progress"));

var _Ticker = _interopRequireDefault(require("../Ticker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clock = null;
describe('<Progress />', function () {
  var renderProgress = function renderProgress(percent) {
    return percent;
  };

  beforeEach(function () {
    clock = _sinon.default.useFakeTimers();
  });
  afterEach(function () {
    clock.restore();
  });
  it('should render <ProgressBar />', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Progress.default, {
      renderProgress: renderProgress
    }));
    expect(renderedComponent.find(_Ticker.default).length).toBe(1);
  });
  it('should initially have state.progress = -1', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Progress.default, {
      renderProgress: renderProgress
    }));
    expect(renderedComponent.state().progress).toBe(-1);
  });
  it('should update state.progress when called updateProgress()', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Progress.default, {
      renderProgress: renderProgress
    }));
    var inst = renderedComponent.instance();
    inst.updateProgress(10);
    expect(renderedComponent.state().progress).toBe(10);
  });
  it('should update state.progress to 0 when progress activated', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Progress.default, {
      renderProgress: renderProgress,
      isActive: false
    }));
    renderedComponent.setProps({
      isActive: true
    });
    expect(renderedComponent.state().progress).toBe(0);
  });
  it('should update state.progress to 100 when progress deactivated', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Progress.default, {
      renderProgress: renderProgress,
      isActive: true
    }));
    renderedComponent.setState({
      progress: 30
    });
    renderedComponent.setProps({
      isActive: false
    });
    expect(renderedComponent.state().progress).toBe(100);
  });
  it('should have displayName', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Progress.default, {
      renderProgress: renderProgress
    }));
    var inst = renderedComponent.instance();
    expect(inst.constructor.displayName).toBe('Progress');
  });
});