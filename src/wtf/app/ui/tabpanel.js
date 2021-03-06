/**
 * Copyright 2012 Google, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

/**
 * @fileoverview Panel control.
 *
 * @author benvanik@google.com (Ben Vanik)
 */

goog.provide('wtf.app.ui.EmptyTabPanel');
goog.provide('wtf.app.ui.TabPanel');

goog.require('goog.dom.TagName');
goog.require('goog.dom.classes');
goog.require('goog.style');
goog.require('wtf.ui.Control');



/**
 * Abstract view panel control.
 *
 * @param {!wtf.app.ui.DocumentView} documentView Parent document view.
 * @param {string} path Path used for navigation.
 * @param {string} name Panel name.
 * @constructor
 * @extends {wtf.ui.Control}
 */
wtf.app.ui.TabPanel = function(documentView, path, name) {
  var dom = documentView.getDom();
  var fragment = dom.getDocument().createDocumentFragment();
  goog.base(this, /** @type {!Element} */ (fragment), dom);

  /**
   * Parent document view.
   * @type {!wtf.app.ui.DocumentView}
   * @private
   */
  this.documentView_ = documentView;

  /**
   * Panel path used for navigation.
   * This is used as the root name when navigating, such as /mypanel/123/.
   * @type {string}
   * @private
   */
  this.path_ = path;

  /**
   * The panel name to display in the tab.
   * @type {string}
   * @private
   */
  this.name_ = name;

  /**
   * Whether the panel is visible.
   * @type {boolean}
   * @private
   */
  this.visible_ = false;
  goog.style.showElement(this.getRootElement(), false);
};
goog.inherits(wtf.app.ui.TabPanel, wtf.ui.Control);


/**
 * Gets the parent document view.
 * @return {!wtf.app.ui.DocumentView} Parent document view.
 */
wtf.app.ui.TabPanel.prototype.getDocumentView = function() {
  return this.documentView_;
};


/**
 * Gets the path of the panel used for navigation.
 * @return {string} Panel path.
 */
wtf.app.ui.TabPanel.prototype.getPath = function() {
  return this.path_;
};


/**
 * Gets the name of the panel to display in the tab.
 * @return {string} Panel name.
 */
wtf.app.ui.TabPanel.prototype.getName = function() {
  return this.name_;
};


/**
 * Gets a value indicating whether the panel is visible.
 * @return {boolean} True if the panel is visible.
 */
wtf.app.ui.TabPanel.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * Sets whether the panel is visible.
 * @param {boolean} value New visibility flag.
 */
wtf.app.ui.TabPanel.prototype.setVisible = function(value) {
  this.visible_ = value;

  goog.style.showElement(this.getRootElement(), value);
};


/**
 * Navigates to the given panel path.
 * @param {!Array.<string>} pathParts Panel path parts split by /, excluding
 *     the panel path identifier.
 */
wtf.app.ui.TabPanel.prototype.navigate = goog.nullFunction;



/**
 * A dummy empty panel.
 * @param {!wtf.app.ui.DocumentView} documentView Parent document view.
 * @param {string} path Path used for navigation.
 * @param {string} name Panel name.
 * @constructor
 * @extends {wtf.app.ui.TabPanel}
 */
wtf.app.ui.EmptyTabPanel = function(documentView, path, name) {
  goog.base(this, documentView, path, name);
};
goog.inherits(wtf.app.ui.EmptyTabPanel, wtf.app.ui.TabPanel);


/**
 * @override
 */
wtf.app.ui.EmptyTabPanel.prototype.createDom = function(dom) {
  var el = dom.createElement(goog.dom.TagName.DIV);
  goog.dom.classes.add(el, goog.getCssName('appUiTabPanel'));
  dom.setTextContent(el, 'TODO');
  return el;
};
