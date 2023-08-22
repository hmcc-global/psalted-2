'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.connectToDB = void 0;
const mongoose_1 = require('mongoose');
let isConnected = false;
const connectToDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (isConnected) {
      console.log('Mongoose: Already connected to MongoDB');
      return;
    }
    try {
      yield (0, mongoose_1.connect)(
        'mongodb://' +
          process.env.MONGO_USERNAME +
          ':' +
          process.env.MONGO_PASSWORD +
          '@' +
          process.env.MONGO_URI +
          '/' +
          process.env.MONGO_DB +
          '?ssl=true&replicaSet=' +
          process.env.MONGO_REPLICA_SET +
          '&authSource=' +
          process.env.MONGO_AUTH_SOURCE
      );
      isConnected = true;
      console.log('Mongoose: Successfully connected to MongoDB');
    } catch (error) {
      console.log(`Mongoose: Error connecting to database\n\n${error.message}`);
    }
  });
exports.connectToDB = connectToDB;
