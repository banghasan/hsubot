"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = exports.TdlError = void 0;

var _path = require("path");

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _debug = _interopRequireDefault(require("debug"));

var _uuidv = _interopRequireDefault(require("./uuidv4"));

var _util = require("./util");

var _prompt = require("./prompt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = (0, _debug.default)('tdl:client');
// const debug = ()=>{};
const debugEmitter = (0, _debug.default)('tdl:client:emitter');
const debugRes = (0, _debug.default)('tdl:client:response');
const debugReq = (0, _debug.default)('tdl:client:request');
const defaultLoginDetails = {
  type: 'user',
  getPhoneNumber: _prompt.getPhoneNumber,
  getAuthCode: _prompt.getAuthCode,
  getPassword: _prompt.getPassword,
  getName: _prompt.getName
};
const defaultOptions = {
  databaseDirectory: '_td_database',
  filesDirectory: '_td_files',
  databaseEncryptionKey: '',
  verbosityLevel: 2,
  receiveTimeout: 10,
  skipOldUpdates: false,
  useTestDc: false,
  useMutableRename: false,
  useDefaultVerbosityLevel: false,
  disableAuth: false,
  tdlibParameters: {
    use_message_database: true,
    use_secret_chats: false,
    system_language_code: 'en',
    application_version: '1.0',
    device_model: 'Unknown device',
    system_version: 'Unknown',
    enable_storage_optimizer: true
  }
};

class TdlDeferred {
  constructor() {
    _defineProperty(this, "_innerDefer", void 0);

    _defineProperty(this, "_done", false);
  }

  // Not done or defer not set
  isPending() {
    return !this._done;
  }

  isDone() {
    return this._done;
  }

  isDeferSet() {
    return this._innerDefer != null;
  }

  setDefer(defer) {
    this._innerDefer = defer;
  }

  resolve(result) {
    if (this._done || !this._innerDefer) return;
    this._done = true;

    this._innerDefer.resolve(result);
  }

  reject(error) {
    if (this._done || !this._innerDefer) return;
    this._done = true;

    this._innerDefer.reject(error);
  }

}

class TdlError extends Error {
  constructor(err, msg) {
    super(msg);

    _defineProperty(this, "err", void 0);

    this.err = err;
  }

}

exports.TdlError = TdlError;

const empty = () => ({});

function invariant(cond, msg) {
  if (!cond) throw new Error(msg);
}

const TDL_MAGIC = '6c47e6b71ea';

class Client {
  constructor(tdlibInstance, options = {}) {
    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_emitter", new _eventemitter.default());

    _defineProperty(this, "_fetching", new Map());

    _defineProperty(this, "_tdlib", void 0);

    _defineProperty(this, "_client", void 0);

    _defineProperty(this, "_connectionState", {
      _: 'connectionStateConnecting'
    });

    _defineProperty(this, "_connectDefer", new TdlDeferred());

    _defineProperty(this, "_authNeeded", false);

    _defineProperty(this, "_loginDetails", void 0);

    _defineProperty(this, "_loginDefer", new TdlDeferred());

    _defineProperty(this, "_paused", false);

    _defineProperty(this, "_initialized", false);

    _defineProperty(this, "getBackendName", () => {
      return this._tdlib.getName();
    });

    _defineProperty(this, "connect", () => {
      return new Promise((resolve, reject) => {
        if (this._initialized) {
          const err = this._client ? Error('The client is already initialized') : Error('Cannot re-initialize a destroyed client');
          return reject(err);
        }

        this._connectDefer.setDefer({
          resolve,
          reject
        });

        this._init();
      });
    });

    _defineProperty(this, "login", (getLoginDetails = empty) => {
      debug('client.login()');

      this._emitter.once('auth-needed', () => {
        this._loginDetails = (0, _util.mergeDeepRight)(defaultLoginDetails, getLoginDetails());
        debug('set _loginDetails to', this._loginDetails);
      });

      return new Promise((resolve, reject) => {
        this._loginDefer.setDefer({
          resolve,
          reject
        });

        this._emitter.emit('_login');
      });
    });

    _defineProperty(this, "connectAndLogin", async (fn = empty) => {
      await this.connect();
      return this.login(fn);
    });

    _defineProperty(this, "pause", () => {
      if (!this._paused) {
        debug('pause');
        this._paused = true;
      } else {
        debug('pause (no-op)');
      }
    });

    _defineProperty(this, "resume", () => {
      if (this._paused) {
        debug('resume');
        this._paused = false;

        this._emitter.emit('_resume');
      } else {
        debug('resume (no-op)');
      }
    });

    _defineProperty(this, "on", (event, listener) => {
      this._emitter.on(event, listener);

      return this;
    });

    _defineProperty(this, "once", (event, listener) => {
      this._emitter.once(event, listener);

      return this;
    });

    _defineProperty(this, "off", (event, listener, once = false) => {
      this._emitter.removeListener(event, listener, undefined, once);
    });

    _defineProperty(this, "addListener", this.on);

    _defineProperty(this, "removeListener", this.off);

    _defineProperty(this, "emit", (event, value) => {
      debugEmitter('emit', event, value);

      this._emitter.emit(event, value);
    });

    _defineProperty(this, "invoke", async request => {
      const id = (0, _uuidv.default)(); // $FlowIgnore[prop-missing]

      request['@extra'] = id;
      const receiveResponse = new Promise((resolve, reject) => {
        // This promise must not be rejected with values other than Td$error
        // for Fluture types to be correct
        try {
          const defer = {
            resolve,
            reject
          };

          this._fetching.set(id, defer);
        } catch (e) {
          this._catchError(new TdlError(e));
        }
      });

      this._send(request);

      return receiveResponse;
    });

    _defineProperty(this, "destroy", () => {
      if (!this._client) return;

      this._tdlib.destroy(this._client);

      this._client = null;
      this.resume();
      this.emit('destroy');
    });

    _defineProperty(this, "close", () => {
      debug('close');
      return new Promise(resolve => {
        if (!this._client) return resolve(); // TODO: call this.resume() here?
        // If the client is paused, we can't receive authorizationStateClosed
        // and destroy won't be called

        this._sendTdl({
          _: 'close'
        });

        this._emitter.once('destroy', () => resolve());
      });
    });

    _defineProperty(this, "setLogFatalErrorCallback", fn => {
      this._tdlib.setLogFatalErrorCallback(fn);
    });

    _defineProperty(this, "execute", request => {
      debugReq('execute', request);
      if (!this._client) return null;
      const {
        _client: client
      } = this;
      const tdRequest = (0, _util.deepRenameKey)('_', '@type', request);

      const tdResponse = this._tdlib.execute(client, tdRequest);

      return tdResponse && (0, _util.deepRenameKey)('@type', '_', tdResponse);
    });

    this._options = (0, _util.mergeDeepRight)(defaultOptions, options);
    if (!options.apiId) throw new TypeError('Valid api_id must be provided.');
    if (!options.apiHash) throw new TypeError('Valid api_hash must be provided.');
    this._tdlib = tdlibInstance;
  }

  static create(tdlibInstance, options = {}) {
    return new Client(tdlibInstance, options);
  }

  _catchError(err) {
    debug('catchError', err);

    const fn = d => d.isPending();

    const defers = [this._connectDefer, this._loginDefer].filter(fn);

    if (defers.length === 0) {
      this.emit('error', err);
      return;
    }

    for (const deferred of defers) deferred.reject(err);
  }

  _rejectConnectAndLogin(err) {
    this._connectDefer.reject(err);

    this._loginDefer.reject(err);
  }

  _init() {
    try {
      if (!this._options.useDefaultVerbosityLevel) {
        debug('_init: setLogVerbosityLevel', this._options.verbosityLevel);

        this._tdlib.execute(null, {
          '@type': 'setLogVerbosityLevel',
          new_verbosity_level: this._options.verbosityLevel
        });
      }

      this._client = this._tdlib.create();
    } catch (e) {
      this._catchError(new TdlError(e, 'Error while creating client'));

      return;
    }

    this._initialized = true;
    if (this._options.disableAuth) this._connectDefer.resolve();

    this._loop().catch(e => this._catchError(new TdlError(e)));
  }

  // Wait until the 'login' function is called
  _waitLogin() {
    debug('waitLogin', this._loginDefer);
    return new Promise(resolve => {
      if (this._loginDefer.isDeferSet()) return resolve();

      this._emitter.once('_login', () => resolve());
    });
  }

  _authHasNeeded() {
    if (this._authNeeded) {
      invariant(this._loginDetails != null, '_authHasNeeded: (_authNeeded true) loginDetails should be set');
      return this._loginDetails;
    }

    this._authNeeded = true;
    this.emit('auth-needed');
    invariant(this._loginDetails != null, '_authHasNeeded: (_authNeeded false) loginDetails should be set');
    return this._loginDetails;
  }

  // Wait until the 'resume' function is called
  _waitResume() {
    return new Promise(resolve => {
      if (!this._paused) resolve();

      this._emitter.once('_resume', () => resolve());
    });
  }

  _send(request) {
    debugReq('send', request);
    if (!this._client) return;
    const {
      _client: client
    } = this;
    const tdRequest = (0, _util.deepRenameKey)('_', '@type', request);

    this._tdlib.send(client, tdRequest);
  }

  _sendTdl(request) {
    // $FlowIgnore[prop-missing]
    this._send(_objectSpread(_objectSpread({}, request), {}, {
      '@extra': TDL_MAGIC
    }));
  }

  async _receive(timeout = this._options.receiveTimeout) {
    if (!this._client) return null;
    const tdResponse = await this._tdlib.receive(this._client, timeout); // Note: Immutable rename is used to preserve key order (for better logs)

    return tdResponse && (this._options.useMutableRename ? (0, _util.deepRenameKey_)('@type', '_', tdResponse) : (0, _util.deepRenameKey)('@type', '_', tdResponse));
  }

  async _loop() {
    while (true) {
      try {
        if (this._paused) {
          debug('receive loop: waiting for resume');
          await this._waitResume();
          debug('receive loop: resumed');
        }

        if (!this._client) {
          debug('receive loop: no client');
          break;
        }

        const response = await this._receive();
        if (response) await this._handleResponse(response);else debug('receive loop: response is empty');
      } catch (e) {
        this._catchError(new TdlError(e));
      }
    }

    debug('receive loop: end');
  }

  async _handleResponse(res) {
    this.emit('response', res);
    debugRes(res);
    if (res._ === 'error') return this._handleError(res);
    const id = res['@extra'];

    const defer = this._fetching.get(id);

    if (defer) {
      delete res['@extra'];
      defer.resolve(res);

      this._fetching.delete(id);
    } else if (id !== TDL_MAGIC) {
      return this._handleUpdate(res);
    } else {
      debug('(TDL_MAGIC) Not emitting response', res);
    }
  }

  async _handleUpdate(update) {
    // updateOption, updateConnectionState, updateAuthorizationState
    // are always emitted, even with skipOldUpdates set to true
    switch (_) {
      case 'updateOption':
        debug('Option:', update);
        this.emit('update', update);
        return;

      case 'updateConnectionState':
        debug('New connection state:', state);
        this._connectionState = state;
        this.emit('update', update);
        return;

      case 'updateAuthorizationState':
        debug('New authorization state:', authorization_state._);
        this.emit('update', update);
        if (!this._options.disableAuth) this._handleAuth(update).catch(e => this._catchError(new TdlError(e)));
        return;

      default:
        const shouldSkip = this._options.skipOldUpdates && this._connectionState._ === 'connectionStateUpdating';
        if (shouldSkip) return;
        this.emit('update', update);
    }
  }

  async _handleAuth(update) {
    const authorizationState = authorization_state;

    switch (authorizationState._) {
      case 'authorizationStateWaitTdlibParameters':
        return this._sendTdl({
          _: 'setTdlibParameters',
          'parameters': _objectSpread(_objectSpread({
            database_directory: (0, _path.resolve)(this._options.databaseDirectory),
            files_directory: (0, _path.resolve)(this._options.filesDirectory),
            api_id: this._options.apiId,
            api_hash: this._options.apiHash,
            use_test_dc: this._options.useTestDc
          }, this._options.tdlibParameters), {}, {
            _: 'tdlibParameters'
          })
        });

      case 'authorizationStateWaitEncryptionKey':
        this._sendTdl({
          _: 'checkDatabaseEncryptionKey',
          encryption_key: this._options.databaseEncryptionKey
        });

        return this._connectDefer.resolve();

      case 'authorizationStateClosed':
        this._rejectConnectAndLogin(Error('Received authorizationStateClosed'));

        return this.destroy();

      case 'authorizationStateReady':
        if (!this._authNeeded) this.emit('auth-not-needed');
    }

    await this._waitLogin();
    debug('waitLogin end', authorizationState._); // TODO: Handle authorizationStateWaitOtherDeviceConfirmation?

    switch (authorizationState._) {
      case 'authorizationStateWaitPhoneNumber':
        {
          const loginDetails = this._authHasNeeded();

          switch (loginDetails.type) {
            case 'user':
              return this._sendTdl({
                _: 'setAuthenticationPhoneNumber',
                phone_number: await loginDetails.getPhoneNumber(false)
              });

            case 'bot':
              return this._sendTdl({
                _: 'checkAuthenticationBotToken',
                token: await loginDetails.getToken(false)
              });
          }
        }

      case 'authorizationStateWaitCode':
        {
          const loginDetails = this._authHasNeeded();

          if (loginDetails.type !== 'user') return;
          const code = await loginDetails.getAuthCode(false);
          return this._sendTdl({
            _: 'checkAuthenticationCode',
            code
          });
        }

      case 'authorizationStateWaitRegistration':
        {
          const loginDetails = this._authHasNeeded();

          if (loginDetails.type !== 'user') return;
          const {
            firstName,
            lastName = ''
          } = await loginDetails.getName();
          return this._sendTdl({
            _: 'registerUser',
            first_name: firstName,
            last_name: lastName
          });
        }

      case 'authorizationStateWaitPassword':
        {
          const loginDetails = this._authHasNeeded();

          if (loginDetails.type !== 'user') return;
          const passwordHint = authorizationState.password_hint;
          const password = await loginDetails.getPassword(passwordHint, false);
          return this._sendTdl({
            _: 'checkAuthenticationPassword',
            password
          });
        }

      case 'authorizationStateReady':
        return this._loginDefer.resolve();
    }
  }

  _emitErrWithoutExtra(error) {
    // $FlowIgnore[prop-missing]
    delete error['@extra'];

    this._catchError(error);
  }

  async _handleError(error) {
    // $FlowIgnore[prop-missing]
    const id = error['@extra'];

    const defer = this._fetching.get(id);

    if (defer) {
      // $FlowIgnore[prop-missing]
      delete error['@extra'];
      defer.reject(error);

      this._fetching.delete(id);
    } else if (id === TDL_MAGIC) {
      const loginDetails = this._loginDetails;
      if (!loginDetails) return this._emitErrWithoutExtra(error);

      switch (loginDetails.type) {
        case 'user':
          return this._handleUserError(error, loginDetails);

        case 'bot':
          return this._handleBotError(error, loginDetails);
      }
    } else {
      this.emit('error', error);
    }
  }

  async _handleUserError(error, loginDetails) {
    switch (error.message) {
      case 'PHONE_CODE_EMPTY':
      case 'PHONE_CODE_INVALID':
        return this._sendTdl({
          _: 'checkAuthenticationCode',
          code: await loginDetails.getAuthCode(true)
        });

      case 'PHONE_NUMBER_INVALID':
        return this._sendTdl({
          _: 'setAuthenticationPhoneNumber',
          phone_number: await loginDetails.getPhoneNumber(true)
        });

      case 'PASSWORD_HASH_INVALID':
        return this._sendTdl({
          _: 'checkAuthenticationPassword',
          password: await loginDetails.getPassword('', true)
        });

      default:
        this._emitErrWithoutExtra(error);

    }
  }

  async _handleBotError(error, loginDetails) {
    switch (error.message) {
      case 'ACCESS_TOKEN_INVALID':
        return this._sendTdl({
          _: 'checkAuthenticationBotToken',
          token: await loginDetails.getToken(true)
        });

      default:
        this._emitErrWithoutExtra(error);

    }
  }

}

exports.Client = Client;