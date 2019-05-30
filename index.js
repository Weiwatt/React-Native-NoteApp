/**
 * @format
 */

import React, { Component } from 'react';
import { AppRegistry} from 'react-native';
import APP from './RootVC';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => APP);
