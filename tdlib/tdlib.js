"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDLib = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let debug = (0, _debug.default)('tdl-tdlib-addon');
// debug = ()=>{}

const defaultLibraryFile = (() => {
  switch (process.platform) {
    case 'win32':
      return 'tdjson.dll';

    case 'darwin':
      return 'libtdjson.dylib';

    default:
      return 'libtdjson.so';
  }
})();

class TDLib {
  constructor(libraryFile = defaultLibraryFile, addonPath = './td.node') {
    _defineProperty(this, "_addon", void 0);

    debug('constructor'); // $FlowIgnore[unsupported-syntax]

    this._addon = require(addonPath); // console.log(this._addon)

    this._addon.load_tdjson(libraryFile);
  }

  getName() {
    return 'addon';
  }

  create() {
    debug('create');
    return this._addon.td_client_create();
  }

  send(client, query) {
    this._addon.td_client_send(client, JSON.stringify(query));
  } // async receive (client: TDLibClient, timeout: number): Promise<Object | null> {
  //   const res = await this._addon.td_client_receive(client, timeout)
  //   if (!res) return null
  //   return JSON.parse(res)
  // }


  receive(client, timeout) {
    return new Promise((resolve, reject) => {
      this._addon.td_client_receive(client, timeout, (err, res) => {
        if (err) return reject(err);
        if (!res) return resolve(null);
        resolve(JSON.parse(res));
      });
    });
  }

  execute(client, query) {
    const res = this._addon.td_client_execute(client, JSON.stringify(query));

    if (!res) return null;
    return JSON.parse(res);
  }

  destroy(client) {
    debug('destroy');

    this._addon.td_client_destroy(client);
  }

  setLogFatalErrorCallback(fn) {
    this._addon.td_set_fatal_error_callback(fn);
  }

}

exports.TDLib = TDLib;