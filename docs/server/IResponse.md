---
id: IResponse
title: IResponse
sidebar_label: IResponse
---

the response object inherits from [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)

## Usage

### status(code: number): IResponse
set response status code
```javascript
res.status(200).json({name:"value"});
```
### contentType(type: string): IResponse
set response content type

### header(key: string, value: string): IResponse
### set(key: string, value: string): IResponse
set response header

### res.cache(seconds: number): IResponse
set Cache-Control header in seconds

### gzip(): IResponse
compress the response with gzip and set Content-Encoding header to gzip

### redirect(path: string): void
redirect the request to new path

### cookie(key: string, value: any, options?: cookie.CookieSerializeOptions): IResponse
sets cookie name to value. The value parameter may be a string or object converted to JSON.

```javascript
res.cookie('name', 'test', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('someName', '{someVal:1}', { expires: new Date(Date.now() + 900000), httpOnly: true });
```
### clearCookie(key: string, options?: cookie.CookieSerializeOptions): IResponse
clears the cookie specified by name.
```javascript
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```

### json(obj: object)

sends a JSON response.
```javascript
res.json({name:"value"});
```
### jsonp(obj: object)
Sends a JSON response with JSONP support. This method is identical to res.json(), except that it opts-in to JSONP callback support
```javascript
res.jsonp({name:"value"});
```

### render(path: string | string[], params?: any): Promise
### render(params?: any): Promise<void>

render view html by path and params
```javascript
res.render('index');
res.render('/path/to/view');
res.render('index',{some:"data"});
```
### send(data?: string | Buffer| object)
send data response

```javascript
res.send(new Buffer('some buffer'));
res.send({ some: 'data' });
res.send('<p>some html</p>');
res.status(404).send('not found');
res.status(500).send({ error: 'some error' });
```