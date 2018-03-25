/*

The MIT License (MIT)

Copyright (c) Thu Aug 18 2016 Zhong Wu zhong.wu@autodesk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var credentials ={

	credentials: {
		// Replace placeholder below by the Consumer Key and Consumer Secret you got from
		// http://developer.autodesk.com/ for the production server
		client_id: process.env.FORGE_CLIENT_ID 			|| 'Forge Client ID',
		client_secret: process.env.FORGE_CLIENT_SECRET  || 'Forge Client Secrect',
		grant_type: 'client_credentials',
		scope: 'data:read'
	},
	
	// If you which to use the Autodesk View & Data API on the staging server, change this url
	BaseUrl: 'https://developer.api.autodesk.com',
	Version: 'v1'
} ;

credentials.Authentication =credentials.BaseUrl + '/authentication/' + credentials.Version + '/authenticate'

module.exports =credentials ;
