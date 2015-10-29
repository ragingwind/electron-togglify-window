'use strict';

const oassign = require('object-assign');

// Delegate function for animation of window set toggle
function ToggleAnimation(target, animation) {
	var preset = {
		hide: {
			hide: 'hide',
			focus: 'show',
			restore: 'show',
			blur: 'hide'
		},
		scale: {
			hide: 'minimize',
			focus: 'focus',
			restore: 'restore',
		}
	};

	this._preset = preset[animation];
	this._target = target;

	if (!this._target) {
		throw new Error('Invalid BrowserWindow instance');
	} else if (!this._preset) {
		throw new Error('Unknown type of animation for toggle');
	}
}

ToggleAnimation.prototype.run = function (action) {
	action = this._preset[action];
	if (action) {
		this._target[action]();
	}
};

ToggleAnimation.prototype.hide = function () {
	this.run('hide');
};

ToggleAnimation.prototype.focus = function () {
	this.run('focus');
};

ToggleAnimation.prototype.restore = function () {
	this.run('restore');
};

ToggleAnimation.prototype.blur = function () {
	this.run('blur');
};

// Set window to be able to togggle
function togglify(win, opts) {
	// extend options for toggle window
	opts = oassign({
		animation: 'hide'
	}, opts);

	win._toggleAction = new ToggleAnimation(win, opts.animation);

	// patch toggle function to window
	win.toggle = function () {
		if (this.isVisible() && this.isFocused()) {
			this._toggleAction.hide();
		} else if (this.isVisible() && !this.isFocused()) {
			this._toggleAction.focus();
		} else if (this.isMinimized() || !this.isVisible()) {
			this._toggleAction.restore();
		}
	};

	// bind event for default action
	win.on('blur', function () {
		if (win.isVisible()) {
			this._toggleAction.blur();
		}
	});

	return win;
}

module.exports = togglify;

module.exports.changeAnimation = function (win, animation) {
	win._toggleAction = new ToggleAnimation(win, animation);
};
