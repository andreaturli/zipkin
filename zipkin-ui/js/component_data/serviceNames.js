/*
 * Copyright 2015-2017 The OpenZipkin Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import {component} from 'flightjs';
import {getError} from '../../js/component_ui/error';
import $ from 'jquery';

export default component(function serviceNames() {
  this.updateServiceNames = function(ev, lastServiceName) {
    $.ajax('/api/v1/services', {
      type: 'GET',
      dataType: 'json'
    }).done(names => {
      this.trigger('dataServiceNames', {names, lastServiceName});
    }).fail(e => {
      this.trigger('uiServerError', getError('cannot load service names', e));
    });
  };

  this.after('initialize', function() {
    this.on('uiChangeServiceName', this.updateServiceNames);
  });
});
