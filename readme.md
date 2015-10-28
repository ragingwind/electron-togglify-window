# electron-toggle-window

> Add toggle feature to window. You can make a toggle-able window

## Install

```
$ npm install --save electron-togglify-window
```

## Usage

```js
const BrowserWindow = require('browser-window');
const togglify = require('electron-togglify-window');

win = togglify(new BrowserWindow({
 side: 'left',
 'always-on-top': false,
 width: 600
}, {
	animation: 'hide'
});
```

## API

### togglify(winInstance, options)

#### winInstance

Instance of the target window should be passed created just to toggle.

#### options

Type: `object`

- `animation`: the way of toggle animation when its will be `hide` or `scale`.

## Run demo

```
$ npm start
```

## License

MIT © [Jimmy Moon](http://ragingwind.md)
