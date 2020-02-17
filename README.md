# SendMail API

### List all devices
**Definition**
`POST /sendMail`
**Response**
- `200 OK` The request was successfully completed.
- `400 Bad Request` The request was invalid.
```json
{
  "name": "Bob",
  "mail": "bob@mail.com",
  "phone": "01 23 45 67 89",
  "message": "Hi! I'm Bob"
},
```

## .env
```sh
$ touch .env
```
```env
GMAIL_USER: 'your.gmail@gmail.com'
GMAIL_PASS: 'APP PASSWORD'
DEST: 'your.targetMail@mail.com'
```
[APP PASSWORD](https://security.google.com/settings/security/apppasswords)