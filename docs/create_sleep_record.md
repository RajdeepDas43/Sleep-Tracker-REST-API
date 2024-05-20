
# Sample Response for Creating a Sleep Record

## Request
**POST /api/sleep**

### Request Body
```json
{
    "userId": "60c72b2f9b1e8b6f88f8e6e1",
    "hours": 8,
    "timestamp": "2023-05-20T22:00:00.000Z"
}
```

## Response
**201 Created**

### Response Body
```json
{
    "_id": "60c72b2f9b1e8b6f88f8e6e2",
    "userId": "60c72b2f9b1e8b6f88f8e6e1",
    "hours": 8,
    "timestamp": "2023-05-20T22:00:00.000Z",
    "createdAt": "2023-05-20T22:00:00.000Z",
    "updatedAt": "2023-05-20T22:00:00.000Z"
}
```
