# api-test

Build a version controlled key-value store with a HTTP API we can query that from. The API needs to be able to:

1. Accept a key(string) and value(some json blob/string) {"key" : "value"} and store them. If an existing key is sent, the value should be updated

2. Accept a key and return the corresponding latest value

3. When given a key AND a timestamp, return whatever the value of the key at the time was.

------

Example:

Method: POST

Endpoint: /api

Body: JSON: {mykey : value1}

Time: 6.00 pm

Response: {"key":"mykey", "value":"value1", "timestamp": time } //Where time is timestamp of the post request (6.00pm) .

------

Method: GET 

Endpoint: /api/mykey

Response: {"value": value1 } 

------

Method: POST

Endpoint: /api

Body: JSON: {mykey : value2}

Time: 6.05 pm

Response: {"key":"mykey", "value":"value2", "timestamp": time } //Where time is timestamp of the new value (6.05pm) .


------

Method: GET 

Endpoint: /api/mykey

Response: {"value": value2 }

------

Method: GET 

Endpoint: /api/mykey?timestamp=1440568980 [6.03pm] // notice that the time here is not exactly 6.00pm

Response: {"value": value1 } // still return value 1 , because value 2 was only added at 6.05pm



All timestamps are unix timestamps according UTC timezone.
