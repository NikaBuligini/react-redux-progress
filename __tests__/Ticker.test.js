"use strict";

var _react = _interopRequireDefault(require("react"));

var _sinon = _interopRequireDefault(require("sinon"));

var _enzyme = require("enzyme");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Ticker = _interopRequireDefault(require("../Ticker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clock = null;
describe('<Ticker />', function () {
  beforeEach(function () {
    clock = _sinon.default.useFakeTimers();
  });
  afterEach(function () {
    clock.restore();
  });
  it('should initially render empty progress', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Ticker.default, null));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should initially render progress html', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Ticker.default, {
      renderProgress: function renderProgress(percent) {
        return _react.default.createElement("div", null, "Progress ".concat(percent));
      }
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should call renderProgress function', function () {
    var renderProgress = jest.fn();
    renderProgress.mockReturnValue(null);
    (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      renderProgress: renderProgress
    }));
    expect(renderProgress).toHaveBeenCalled();
  });
  it('should set state.percent as props.percent', function () {
    var expected = 50;
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: expected
    }));
    expect(renderedComponent.state().percent).toEqual(expected);
  });
  it('should set state.maxPercent as props.maxPercent', function () {
    var expected = 50;
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      maxPercent: expected
    }));
    expect(renderedComponent.state().maxPercent).toEqual(expected);
  });
  it('should fallback to default maxPercent', function () {
    var passed = 150;
    var expected = 85;
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      maxPercent: passed
    }));
    expect(renderedComponent.state().maxPercent).toEqual(expected);
  });
  it('should fallback to default maxPercent when string is passed', function () {
    var passed = '95';
    var expected = 85;
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      maxPercent: passed
    }));
    expect(renderedComponent.state().maxPercent).toEqual(expected);
  });
  it('should call componentDidMount', function () {
    _sinon.default.spy(_Ticker.default.prototype, 'componentDidMount'); // eslint-disable-next-line


    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 0,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    expect(_Ticker.default.prototype.componentDidMount.calledOnce).toEqual(true);

    _Ticker.default.prototype.componentDidMount.restore();
  });
  it('should call componentWillReceiveProps', function () {
    _sinon.default.spy(_Ticker.default.prototype, 'componentWillReceiveProps');

    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 0,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    renderedComponent.setProps({
      percent: 50
    });
    expect(_Ticker.default.prototype.componentWillReceiveProps.calledOnce).toEqual(true);

    _Ticker.default.prototype.componentWillReceiveProps.restore();
  });
  it('should unset Ticker.interval after getting new props', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 0,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    var inst = renderedComponent.instance();
    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    inst.componentWillReceiveProps({
      percent: 50
    });
    expect(inst.interval).toBeUndefined();
  });
  it('should unset Ticker.timeout after getting new props', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 100,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    var inst = renderedComponent.instance();
    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    inst.componentWillReceiveProps({
      percent: 50
    });
    expect(inst.timeout).toBeUndefined();
  });
  it('should set state to -1 after new route mounts', function () {
    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 0,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    renderedComponent.setProps({
      percent: 100
    });
    clock.tick(501);
    expect(renderedComponent.state().percent).toEqual(-1);
  });
  it('should call componentWillUnmount', function () {
    _sinon.default.spy(_Ticker.default.prototype, 'componentWillUnmount');

    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 0,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    renderedComponent.unmount();
    expect(_Ticker.default.prototype.componentWillUnmount.calledOnce).toEqual(true);

    _Ticker.default.prototype.componentWillUnmount.restore();
  });
  it('should unset Ticker.interval after unmounting', function () {
    _sinon.default.spy(_Ticker.default.prototype, 'componentWillUnmount');

    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 0,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    var inst = renderedComponent.instance();
    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    renderedComponent.unmount();
    expect(inst.interval).toBeUndefined();

    _Ticker.default.prototype.componentWillUnmount.restore();
  });
  it('should unset Ticker.timeout after unmounting', function () {
    _sinon.default.spy(_Ticker.default.prototype, 'componentWillUnmount');

    var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
      percent: 100,
      updateProgress: function updateProgress(noop) {
        return noop;
      }
    }));
    var inst = renderedComponent.instance();
    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    renderedComponent.unmount();
    expect(inst.timeout).toBeUndefined();

    _Ticker.default.prototype.componentWillUnmount.restore();
  });
  describe('increment progress', function () {
    beforeEach(function () {
      clock = _sinon.default.useFakeTimers();
    });
    afterEach(function () {
      clock.restore();
    });
    it('should start incrementing progress if 0 <= percent < 100', function () {
      var initialPercent = 50;
      var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
        percent: initialPercent,
        updateProgress: function updateProgress(noop) {
          return noop;
        }
      }));
      clock.tick(1000);
      expect(renderedComponent.state().percent).toBeGreaterThan(initialPercent);
    });
    it('should stop incrementing progress if percent >= 100', function () {
      var initialPercent = 100;
      var expected = -1;
      var renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Ticker.default, {
        percent: initialPercent,
        updateProgress: function updateProgress(noop) {
          return noop;
        }
      }));
      clock.tick(1000);
      expect(renderedComponent.state().percent).toEqual(expected);
    });
  });
});