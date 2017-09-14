'use strict';

import {desc, url, Person} from './modules/mod1'
import Util from 'util'
console.log(1111);

let person = new Person;
console.log(person.getHello() + person.getName());
console.log(desc);
console.log(url);
console.log(Util.proxy);

// jquery
$(function() {
  $('.wrap').find('p').text('jquery project')

});
