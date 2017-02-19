//Copyright (c) 2016 TimTheSinner All Rights Reserved.
'use strict';
/**
 * Copyright (c) 2016 TimTheSinner All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author TimTheSinner
 */
import React from 'react';

import reactEvents from './events';

function dashToCamel(str) {
  if (str.includes('-')) {
    const parts = str.split('-');
    for (var i = 1; i < parts.length; i++) {
      parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
    }
    return parts.join('');
  }
  return str;
}

function keyToReact(key) {
  if (key == 'class') {
    return 'className';
  }

  return dashToCamel(key);
}

class Helper {
  constructor(that, key) {
    this.that = that;
    this.key = key;
  }

  get baseVal() {
    return this;
  }

  get value() {
    return this.that.getAttribute(this.key);
  }
}

export default class VirtualDOM {
  constructor(type = 'svg', props = {}) {
    this.type = type;
    this.props = { style: {}, ...props };

    this.ownerDocument = this;
    this.documentElement = this;
    this.style = this;
    this.rootElement = this;

    if (type === 'svg') {
      this._ownerSVGElement = this;
    }

    this.width = new Helper(this, 'width');
    this.height = new Helper(this, 'height');
  }

  get ownerSVGElement() {
    return this._ownerSVGElement;
  }

  getAttribute(key) {
    return this.props[key];
  }

  setAttribute(key, value) {
    this.props[keyToReact(key)] = value;
  }

  removeAttribute(key) {
    delete this.props[keyToReact(key)];
  }

  addEventListener(type, listener, options) {
    const reactEvent = reactEvents(type);
    if (reactEvent) {
      this.props[reactEvent] = event => {
        event.target.__data__ = this.__data__ != undefined ? this.__data__ : {};
        //event.view = this.rootElement;
        if (!event.stopImmediatePropagation) {
          listener.call(this, { ...event, stopImmediatePropagation: () => {} });
        } else {
          listener.call(this, event);
        }
      };
    }
  }

  setProperty(name, value, priority) {
    if (priority) {
      console.log(`Encountered priority[${priority}] in setProperty`);
    }
    this.props.style[dashToCamel(name)] = value;
  }

  removeProperty(name) {
    delete this.props.style[name];
  }

  createElementNS(uri, name) {
    const node = new VirtualDOM(name);
    node.parentNode = this;
    if (this._ownerSVGElement) {
      node._ownerSVGElement = this._ownerSVGElement;
    }
    node.rootElement = this.rootElement;
    return node;
  }

  insertBefore(child, next) {
    if (!next) {
      return this.appendChild(child);
    } else {
      if (Array.isArray(this.children)) {
        const index = this.children.indexOf(next);
        if (index >= 0) {
          this.children.splice(index, 0, child);
        } else {
          this.children.unshift(child);
        }
      } else if (this.children) {
        this.children = [child, this.children];
      } else {
        this.children = child;
      }
      return child;
    }
  }

  querySelector(selector) {
    if (selector[0] === '.') {
      selector = selector.slice(1);
      return this.children.find(c => {
        return c.props.className && c.props.className.includes(selector);
      });
    }
    console.log(selector);
  }

  appendChild(dom) {
    if (Array.isArray(this.children)) {
      this.children.push(dom);
    } else if (this.children) {
      this.children = [this.children, dom];
    } else {
      this.children = dom;
    }
    return dom;
  }

  querySelectorAll(selector) {
    const { children } = this;
    if (!selector) {
      if (Array.isArray(children)) {
        return children;
      } else if (children) {
        return [children];
      }
    }

    if (selector[0] === '.') {
      selector = selector.slice(1);
      if (Array.isArray(children)) {
        return children.filter(c => {
          return c.props.className && c.props.className.includes(selector);
        });
      } else if (children) {
        if (children.props.className && children.props.className.includes(selector)) {
          return [children];
        }
      }
      return [];
    }

    if (selector[0] === '#') {
      selector = selector.slice(1);
      if (Array.isArray(children)) {
        return children.filter(c => {
          return c.props.id && c.props.id.includes(selector);
        });
      } else if (children) {
        if (children.props.id && children.props.id.includes(selector)) {
          return [children];
        }
      }
      return [];
    }

    if (Array.isArray(children)) {
      const array = children.filter(c => {
        return c.type === selector;
      }).concat(...children.map(c => {
        return c.querySelectorAll(selector);
      }));
      return array;
    } else if (children) {
      const matched = children.querySelectorAll(selector);
      if (children.type === selector) {
        return [children].concat(matched);
      }
      return matched;
    }

    return [];
  }

  renderChildren() {
    const { children } = this;
    if (Array.isArray(children)) {
      return children.map((c, i) => {
        if (!c.render) {
          return c;
        }
        if (!c.props.key) {
          c.props.key = this.props.key + '-' + i;
        }
        return c.render();
      });
    } else if (children) {
      if (!children.render) {
        return children;
      }
      if (!children.props.key) {
        children.props.key = this.props.key + '-0';
      }
      return this.children.render();
    }
  }

  render() {
    if (this.props.key) {
      this.props['data-virtualid'] = this.props.key;
    }

    if (this.textContent) {
      this.appendChild(this.textContent);
    }
    return React.createElement(this.type, this.props, this.renderChildren());
  }
}
