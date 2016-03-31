# [Spy](http://changbenny.github.io/Spy/demo)
Spy is a modern, open-source JavaScript tool to analysis users behavior for web applications. It can trace user's mouse and produce nice statistic data including clicks, scroll and other useful information.

### Why Spy?
Spy is a lighweight but powerful tool, can be setup in just 30 seconds and you can immediately see the result. Ever be curious about how users browse your site? Just add one line of code and you can enjoy the happiness of better understanding visitors of your site!

Unlike other web analytics tools (such as Google Analysis, Inspectlet), you can save the user data in your own data storage. Private data should keep secret.

[Demo](http://changbenny.github.io/Spy/demo)

### Installation

```sh
npm install --save spy.js
```

### How to use?
Put the code into your application, spy the users:

```javascript
spy.start()
spy.upload('my-site-name')
```

Then behavior data will be uploaded and save to cloud storage automatically.
When you want to see the result:

```javascript
spy.show('my-site-name')
```
### API
#### spy.start()
Begin to spy, normally it will be called once after sites initialized. it is used to record the behavior of visitors. Notice that you should use `spy.upload(name, interval)` to upload the data. If you want to store the data in your private storage, can use `spy.export()` to export current record.

#### spy.upload(id[, interval])

#### spy.show(id[, options])

#### spy.current([options])

#### spy.export()

#### spy.analysis(id, callback)

### Contribute
Any contribution is all welcome. For feature requests and bugs report, please open an issue or pull request.

#### Build
```sh
npm install
gulp
```

### License
MIT
