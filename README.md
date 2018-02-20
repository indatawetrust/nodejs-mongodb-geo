[![Build Status](https://travis-ci.org/indatawetrust/nodejs-mongodb-geo.svg?branch=master)](https://travis-ci.org/indatawetrust/nodejs-mongodb-geo)

[demo](https://driverapp9.herokuapp.com/)

#### create driver
```
POST /drivers/driver
```
##### Parameters
###### URI Parameters
None
###### Body Parameters
Field | Required | Description
--- | --- | ---
name | Y |
surname | Y |
latitude | Y | 
longitude | Y |

#### info driver
```
GET /drivers/driver/:id
```
#### Parameters
###### URI Parameters
Field | Required | Description
--- | --- | ---
id | Y | driver id
###### Body Parameters
None

#### update driver
```
PUT /drivers/driver/:id
```
#### Parameters
###### URI Parameters
Field | Required | Description
--- | --- | ---
id | Y | driver id
###### Body Parameters
Field | Required | Description
--- | --- | ---
name | N |
surname | N |
latitude | N | 
longitude | N |

#### delete driver
```
DELETE /drivers/driver/:id
```
#### Parameters
###### URI Parameters
Field | Required | Description
--- | --- | ---
id | Y | driver id
###### Body Parameters
None

#### all drivers
```
GET /drivers
```
#### Parameters
###### URI Parameters
Field | Required | Description
--- | --- | ---
page | N | page number
###### Body Parameters
None

#### drivers nearby
```
POST /ride
```
#### Parameters
###### URI Parameters
None
###### Body Parameters
Field | Required | Description
--- | --- | ---
latitude | Y | 
longitude | Y |
