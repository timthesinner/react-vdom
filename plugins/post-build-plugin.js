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
const fs = require('fs');
const path = require('path');

export default class PostBuildPlugin {
  find(dir) {
    const html = {};
    const files = fs.readdirSync(dir);

    for (var file of files) {
      const stat = fs.statSync(path.join(dir, file));
      if (stat && stat.isDirectory() && file !== 'example') {
        html[file] = this.find(path.join(dir, file));
      } else if (path.extname(file) === '.html') {
        html[file] = true;
      }
    }

    return html;
  }

  delete(root, mapping) {
    for (var key in mapping) {
      const value = mapping[key];
      const file = path.join(root, key);
      if (value === true) {
        console.log('Removing:', file);
        fs.unlinkSync(file);
      } else {
        this.delete(file, value);
      }
    }
  }

  copy(src, dest, mapping) {
    if (!fs.existsSync(dest) && Object.keys(mapping).length > 0) {
      fs.mkdirSync(dest);
    }

    for (var key in mapping) {
      const value = mapping[key];
      const _src = path.join(src, key);
      const _dest = path.join(dest, key);
      if (value === true) {
        if (fs.existsSync(_dest)) {
          fs.unlinkSync(_dest);
        }

        console.log('Placing:', _dest);
        fs.writeFileSync(_dest, fs.readFileSync(_src));

        fs.unlinkSync(_src);
      } else {
        this.copy(_src, _dest, value);
      }
    }
  }

  apply(compiler) {
    const path = compiler.options.output.path;
    if (fs.existsSync(path)) {
      this.delete(path, this.find(path));
    }

    compiler.plugin('done', () => {
      this.copy(path, './', this.find(path));
    });
  }
}
