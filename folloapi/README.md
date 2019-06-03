# Follo-API

This project provides the Follo-API

## Config
Create a .env file at the root directory with the following properties 

DB_HOST=`<your mongo host>`:`<port>`

SERVER_PORT=`<port for express server>`

JWT_KEY=`<jwt key>`

### Default Config
If the the env file is not created, the api will run with the following properties:

DB_HOST=`mongodb://localhost:27017`

SERVER_PORT=`3000`

JWT_KEY=`test`


## Build

Run 
`npm install`

## Run

Run 
`npm start`

---
## API End Points with sample payload and headers
For complete list of attributes of a component, refer to its schema.

### User Authentication Endpoints
### POST /user/signup/
#### This will signup the user and provide authentication token.
```
headers: {
    Content-Type: application/json
}
```
```
body: {
	"firstName": "u1",
	"lastName": "u1",
	"email": "u1@u1.com",
	"password": "u1",
	"username": "u1"
}
```
```
response : {
    "email": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODcwM30"
}
```

### POST /user/login
#### This will login the user and provide provide authentication token.
```
headers: {
    Content-Type: application/json
}
```
```
body: {
	"email": "u1@u1.com",
	"password": "u1",
}
```
```
response : {
    
    "user": "u1@u1.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MTU1NTM5ODczMH0"

}
```
### POST /user/me 
#### This will return the user details, provided the user is authenticated (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
body: {
	"email": "u1@u1.com",	
}
```
```
response : {
   "lastName": "u1",
    "profilePicture": "",
    "_id": "5cb919bbdb53e2273481680e",
    "firstName": "u1",
    "email": "u1@u1.com",
    "username": "u1",
    "createdCommunities": [],
    "followingCommunities": [],
    "createdPosts": [],
    "upvotes": [],
    "downvotes": []
}
```

### POST /user/logout
#### This will logout the user (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
response: {
    "status": 200,
    "message": "logged out"
}
```
---
### Post Related Endpoints
### POST /community/:community/post/
#### This will add a post to the community (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
In case of Text Post:
```
body: {
    "type":"text",
    "title": "My Post",
    "content": "This is my text post"
}
```
In case of Media Post:
```
body: {
    "title": "My Post",
    "type":"image",
    "content": "This is my image post",
    "post_media":[
        {
            "name":"aaaa.jpg",
            "url":"s3_location_of_image1"
        },
        {
            "name":"bbbb.jpg",
            "url":"s3_location_of_image2"
        }
    ]
}
```
In case of Event Post:
```
body: {
    "title": "My Post",
    "type":"event",
    "content": "This is my event post",
}
```
```
response : {
    "post": {
        "parent_community": {
            "_id": "5cb66e8af948654a7c8dc947",
            "cname": "carr1"
        },
        "created_by": {
            "_id": "5cb919bbdb53e2273481680e",
            "username": "u1"
        },
        "content": "This is my text post",
        "type": "text",
        "is_active": true,
        "_id": "5cbb21d290ba7017e49e6a21",
        "title": "My Post",
        "event_desc": [],
        "post_media": [],
        "posted_on": "2019-04-20T13:42:42.235Z",
        "last_updated_on": "2019-04-20T13:42:42.235Z",
        "__v": 0
    }
}
```
### PUT /community/:community/post/:id
#### This will update community's post by creator (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
In case of Text Post:
```
body: {
	"title": "My Post Update",
	"content": "This is my updated text post"
}
```
In case of Image Post:
```
body: {
	"title": "My Post",
	"content": "This is my updated image post",
    "images":[
        {
            "url":"S3://s3_location_of_image1"
        },
        {
            "url":"S3://s3_location_of_image2"
        }
    ]
}
```
```
response : {
    "id": "9999999999999999"
}
```
### GET /community/:community/post/
#### This will get all posts of the community (protected).
### GET /community/:community/post?key=search-key
#### This will get all posts of the community that has the search-key in its title or content (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
response : [
    {
        "parent_community": {
            "_id": "5cb66e8af948654a7c8dc947",
            "cname": "carr1"
        },
        "created_by": {
            "_id": "5cb919bbdb53e2273481680e",
            "username": "u1"
        },
        "content": "This is my text post",
        "type": "text",
        "is_active": true,
        "_id": "5cbb21d290ba7017e49e6a21",
        "title": "My Post",
        "event_desc": [],
        "post_media": [],
        "posted_on": "2019-04-20T13:42:42.235Z",
        "last_updated_on": "2019-04-20T13:42:42.235Z",
        "__v": 0
    }
]
```
### GET /community/:community/post/:postid
#### This will get a specific post (protected).
```
headers: {
    Content-Type: application/json,
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InUxQHUxLmNvbSIsImlhdCI6MT
}
```
```
response : {
    "parent_community": {
        "_id": "5cb66e8af948654a7c8dc947",
        "cname": "carr1"
    },
    "created_by": {
        "_id": "5cb919bbdb53e2273481680e",
        "username": "u1"
    },
    "content": "This is my text post",
    "type": "text",
    "is_active": true,
    "_id": "5cbb21d290ba7017e49e6a21",
    "title": "My Post",
    "event_desc": [],
    "post_media": [],
    "posted_on": "2019-04-20T13:42:42.235Z",
    "last_updated_on": "2019-04-20T13:42:42.235Z",
    "__v": 0
}
```
### Community Endpoints
https://web.postman.co/collections/6342875-c6163ceb-29b9-4fc3-8994-b36b4e4e5002?workspace=92c46228-b716-4880-88f1-444f32cbbd7e

#### Create Community 
#### /POST /community

 ```
 headers
 Authorization <Token Key>
 ```
 ```
 Request Body
    Body - form-data

    commImage - <Image To Upload>
    cname - Friends
    description - Watching Friends
```
```json
Response
{
    "cname": "Friends",
    "description": "Watching Friends",
    "memberIds": [
        {
            "member": {
                "id": "5cbe4a33f47c6d06a89337ea",
                "username": "u6"
            },
            "_id": "5cbe4ab1f47c6d06a89337f3"
        }
    ],
    "createdBy": {
        "user": {
            "id": "5cbe4a33f47c6d06a89337ea",
            "username": "u6"
        }
    },
    "createdDate": "2019-04-22T23:13:53.410Z"
}
```

#### Find Community By Name
#### GET /community/:name

```json
Response
{
    "createdBy": {
        "user": {
            "id": "5cbe4a33f47c6d06a89337ea",
            "username": "u6"
        }
    },
    "isActive": true,
    "_id": "5cbe4a75f47c6d06a89337ee",
    "cname": "Northeastern University",
    "description": "Grad School",
    "memberIds": [
        {
            "member": {
                "id": "5cbe4a33f47c6d06a89337ea",
                "username": "u6"
            },
            "_id": "5cbe4a75f47c6d06a89337ef"
        }
    ],
    "posts": [],
    "createdDate": "2019-04-22T23:12:53.942Z",
    "cid": 1,
    "__v": 0
}
```
### GET ALL COMMUNITIES
 #### GET /communities

 ```json
 Response
 [
    {
        "createdBy": {
            "user": {
                "id": "5cbe4a33f47c6d06a89337ea",
                "username": "u6"
            }
        },
        "isActive": true,
        "_id": "5cbe4a75f47c6d06a89337ee",
        "cname": "Northeastern University",
        "description": "Grad School",
        "memberIds": [
            {
                "member": {
                    "id": "5cbe4a33f47c6d06a89337ea",
                    "username": "u6"
                },
                "_id": "5cbe4a75f47c6d06a89337ef"
            }
        ],
        "posts": [],
        "createdDate": "2019-04-22T23:12:53.942Z",
        "cid": 1,
        "__v": 0
    },
    {
        "createdBy": {
            "user": {
                "id": "5cbe4a33f47c6d06a89337ea",
                "username": "u6"
            }
        },
        "isActive": true,
        "_id": "5cbe4ab1f47c6d06a89337f2",
        "cname": "Friends",
        "description": "Watching Friends",
        "communityPicture": "https://hex-clan-follo-community.s3.amazonaws.com/WIN_20190420_11_22_42_Pro.jpg",
        "memberIds": [
            {
                "member": {
                    "id": "5cbe4a33f47c6d06a89337ea",
                    "username": "u6"
                },
                "_id": "5cbe4ab1f47c6d06a89337f3"
            }
        ],
        "posts": [],
        "createdDate": "2019-04-22T23:13:53.410Z",
        "cid": 2,
        "__v": 0
    }
]
```
### Follow Community
 #### PUT /community/follow/:name

 ``` 
 header
  Authrization Bearer <Token>
```
```json
Response
{
    "message": " Community joined Successfully",
    "joinStatus": true,
    "community": {
        "createdBy": {
            "user": {
                "id": "5cbe4a33f47c6d06a89337ea",
                "username": "u6"
            }
        },
        "isActive": true,
        "_id": "5cbe4e87e47f684534e6b3fc",
        "cname": "Breaking Bad",
        "description": "Meth",
        "communityPicture": "https://hex-clan-follo-community.s3.amazonaws.com/WIN_20190420_11_22_42_Pro.jpg",
        "memberIds": [
            {
                "member": {
                    "id": "5cbe4a33f47c6d06a89337ea",
                    "username": "u6"
                },
                "_id": "5cbe4e87e47f684534e6b3fd"
            }
        ],
        "posts": [],
        "createdDate": "2019-04-22T23:30:15.294Z",
        "cid": 5,
        "__v": 0
    }
}
```
#### Unfollow Community
#### PUT /community/unfollow/:name

``` 
headers

Authorization Bearer <Token>
```
```
Response
{
    "message": " Community unfollowed successfully",
    "unfollowStatus": true
}
```
#### DELETE COMMUNITY

#### /PUT /communtiy/delete/:name

```
Authorization   Bearer <Token>

```
```json
{
    "message": " Community deleted successfully",
    "deleteStatus": true
}
```
