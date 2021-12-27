# Nest Role Based Security

Built using [Nest.js](https://nestjs.com/), [Nest-access-control](https://www.npmjs.com/package/nest-access-control),
and [accesscontrol](https://www.npmjs.com/package/accesscontrol).

## Getting Started

```
yarn install
yarn dev
```

## Demo

For this simple demo we have 6 users  distributed through 2 institutions. 
Some users are workers for one or more institutions. Some users are admins
for an institution. As such, they have different access for different parts 
of the application

| user  | description                      | 
|-------|----------------------------------|
| 1     | Worker for institution 1.        |
| 2     | Worker for institution 1.        |
| 3     | Worker for institution 1 and 2.  |
| 4     | Worker for institution 2.        |
| 5     | Admin for institution 1.         |
| 6     | Admin for instution 2.           |

You can login as any of these users 

```
 curl -X POST http://localhost:3000/auth/login/:userId
```

This will return your JWT token which you can use to make requests to two data points:

```
curl -H "Authorization: Bearer ${TOKEN}" https://localhost:3000/institution/1
curl -H "Authorization: Bearer ${TOKEN}" https://localhost:3000/institution/1/workers
```

Admins should have access to information about the institution as well as workers from
the institution they administer.

Workers should only have access to information about the institution where they work.

## How dows this work

The code leverages [Nest-access-control](https://www.npmjs.com/package/nest-access-control), 
but builds on top of it since the default implementation is rather lacking.

First we define application wide rules:

```ts
roles
    .grant(AppRole.INSTITUTION_ADMIN)
        .readOwn(AppResource.INSTITUTION)
        .readOwn(AppResource.INSTITUTION_WORKERS)
    .grant(AppRole.INSTITUTION_WORKER)
        .readOwn(AppResource.INSTITUTION);
```
These are sets of business roles that are fairly readable in english.

Then, on a resource, we annotate what does the resource do:

```ts
    @AccessControl({
        resource: AppResource.INSTITUTION_WORKERS, 
        action: 'read',
        possession: 'own', 
        target: "institutionId", // This is my contribution
    })
    @Get(":institutionId/workers")
    getInstitutionWorkers(
        @Param('institutionId') id: UserId,
    ): User[] {
        return this.workerRepository.getWorkersByInstitution(id);
    }
```

Everything here is the same as as [Nest-access-control](https://www.npmjs.com/package/nest-access-control),
except for the `AccessControl` decorator which adds a `target` parameter, specifying what 
param controls the target of our resource.

and finally, we have a `AccessControlGuard` that controls access based on roles. The 
implementation of this  is rather raw right now but basically what it does is:

- Determine the current user from the request
- Determine the current user roles based on database connections
- Determine the target resource from the request
- Filter the roles relevant for the required request.
- Give access based on the roles the user has for the target request
