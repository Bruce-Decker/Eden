webpackHotUpdate("main",{

/***/ "./src/components/property/Property.js":
/*!*********************************************!*\
  !*** ./src/components/property/Property.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Property_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Property.css */ "./src/components/property/Property.css");
/* harmony import */ var _Property_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Property_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _banner_RegularBanner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../banner/RegularBanner */ "./src/components/banner/RegularBanner.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Filter */ "./src/components/property/Filter.js");
/* harmony import */ var _Detail__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Detail */ "./src/components/property/Detail.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/es/Recompose.js");
/* harmony import */ var react_google_maps__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-google-maps */ "./node_modules/react-google-maps/lib/index.js");
/* harmony import */ var react_google_maps__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_google_maps__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _redux_actions_PropertyActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../redux/actions/PropertyActions */ "./src/redux/actions/PropertyActions.js");






var _jsxFileName = "/Users/wm/GitHub/Eden/client/src/components/property/Property.js";









/* eslint-disable no-undef */

var Map;
var lat = 37.3351874,
    lng = -121.8810715;
var icon = 'http://maps.google.com/mapfiles/ms/icons/green.png';
var mapAttributes = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUocP7N8Bfa2KLWKYEfA-E7dIHfDkLwkM&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }),
  containerElement: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      height: '100vh'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }),
  mapElement: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  })
};

var Property =
/*#__PURE__*/
function (_Component) {
  Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Property, _Component);

  function Property(_props) {
    var _this;

    Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Property);

    _this = Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Property).call(this, _props));

    _this.setCurrentPosition = function (position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;

      _this.setCenter(lat, lng);
    };

    _this.setCenter = function (lat, lng) {
      var center = _this.state.center;
      center[0] = lat;
      center[1] = lng;

      _this.setMap();

      _this.setState({
        update: true,
        center: center
      });

      setTimeout(function () {
        _this.search(0, 0, 'houses', 'sale');
      }, 1000);
    };

    _this.handleError = function (error) {
      if (error.code === error.PERMISSION_DENIED) {
        _this.setState({
          update: true
        });
      }
    };

    _this.delayedShowMarker = function () {
      setTimeout(function () {
        _this.setState({
          isMarkerShown: true
        });
      }, 2500);
    };

    _this.handleMarkerClick = function (key) {
      _this.handleShow();
    };

    _this.search = function (price, bed, type, listing) {
      var bounds = _this.map.current.getBounds();

      var nelat = bounds.na.l;
      var nelng = bounds.ga.l;
      var swlat = bounds.na.j;
      var swlng = bounds.ga.j;

      _this.props.getProperties(nelat, swlat, nelng, swlng, price, bed, type, listing);
    };

    _this.setMap = function () {
      Map = Object(recompose__WEBPACK_IMPORTED_MODULE_12__["compose"])(Object(recompose__WEBPACK_IMPORTED_MODULE_12__["withProps"])(mapAttributes), react_google_maps__WEBPACK_IMPORTED_MODULE_13__["withScriptjs"], react_google_maps__WEBPACK_IMPORTED_MODULE_13__["withGoogleMap"])(function (props) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_13__["GoogleMap"], {
          ref: _this.map,
          defaultZoom: 16,
          center: {
            lat: _this.state.center[0],
            lng: _this.state.center[1]
          },
          options: {
            gestureHandling: 'greedy',
            disableDefaultUI: true
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_13__["Marker"], {
          position: {
            lat: lat,
            lng: lng
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 119
          },
          __self: this
        }), Array.from(props.properties, function (e, i) {
          var price = '$' + props.properties[i].price;
          var lat = props.properties[i].lat;
          var lng = props.properties[i].lng;
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_13__["Marker"], {
            key: i,
            icon: icon,
            label: {
              text: price,
              fontFamily: "Nunito",
              fontSize: "16px",
              color: "ิblack"
            },
            position: {
              lat: lat,
              lng: lng
            },
            onClick: _this.handleMarkerClick,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 124
            },
            __self: this
          });
        }));
      });
    };

    _this.map = react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef();
    _this.handleError = _this.handleError.bind(Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    _this.handleShow = _this.handleShow.bind(Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    _this.handleClose = _this.handleClose.bind(Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this)));
    _this.state = {
      show: false,
      isMarkerShown: true,
      center: [lat, lng],
      update: true
    };
    return _this;
  }

  Object(_Users_wm_GitHub_Eden_client_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Property, [{
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        show: false
      });
    }
  }, {
    key: "handleShow",
    value: function handleShow() {
      this.setState({
        show: true
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.handleError);
      this.setMap();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.delayedShowMarker()
      document.body.style.overflow = 'hidden';
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.style.overflow = 'unset';
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_banner_RegularBanner__WEBPACK_IMPORTED_MODULE_8__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_9__["default"], {
        search: this.search,
        setCenter: this.setCenter,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Detail__WEBPACK_IMPORTED_MODULE_10__["default"], {
        show: this.state.show,
        handleClose: this.handleClose,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Map, {
        properties: this.properties,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      }));
    }
  }]);

  return Property;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getProperties: function getProperties(nelat, swlat, nelng, swlng, price, bed, type, listing) {
      dispatch(Object(_redux_actions_PropertyActions__WEBPACK_IMPORTED_MODULE_14__["getProperties"])(nelat, swlat, nelng, swlng, price, bed, type, listing));
    }
  };
};

function mapStateToProps(state) {
  return {
    properties: state.property.data
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_11__["connect"])(mapStateToProps, mapDispatchToProps)(Property));

/***/ })

})
//# sourceMappingURL=main.d85e7b8337062d81d106.hot-update.js.map