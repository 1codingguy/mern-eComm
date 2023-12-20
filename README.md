MERN stack project with Vite and TypeScript

## What is this project about?

This is a MERN stack learning project, inspired by [this tutorial](https://www.traversymedia.com/mern-stack-from-scratch). It diverges from the original tutorial by using Vite TS instead of Create React App and TypeScript in place of JavaScript. The project aims to demonstrate a practical implementation of the MERN stack, integrating these modern technologies and techniques.

## Main Technologies Used in This Project

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
- **Bootstrap**: A front-end framework for developing responsive and mobile-first websites.
- **Redux and RTK (Redux Toolkit)**: For efficient state management in React applications.
- **Node.js**: A JavaScript runtime for building fast and scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **MongoDB**: A NoSQL database for modern applications with powerful querying and indexing capabilities.

## Things learned other than coding along

### Ensuring Type Safety in Frontend and Backend

Ensuring type safety across both the frontend and backend of an application is a complex but crucial task. Here's what I've learned about maintaining this consistency:

#### Type and Interface Sharing Between Frontend and Backend

- **Mongoose Schema to TypeScript Types**: Inferring TypeScript types from a Mongoose schema and reusing these types in both backend controllers and frontend components involves some intricate steps.
- **TypeScript Configuration for Shared Types**: As per this [StackOverflow solution](https://stackoverflow.com/a/65046066), including the following configuration in the frontend's `tsconfig.json` allows imports from `@backend` to reference the backend folder:
``` json

"compilerOptions": {
	"paths": {
		"@backend/*": ["../backend/types/*"]
		},
	}
```
- **Advantages of Apollo + GraphQL**: A setup like Apollo with GraphQL, which auto-generates types when fetching data to the frontend, presents a more streamlined approach. This allows for a complete separation of frontend and backend code, while still keeping the types in sync.

#### Ensuring Type Safety in Backend Controllers

- **Handling `req.body` Types**: In Node.js and Express, `req.body` often defaults to the type `any`. To establish type safety, especially for client requests and server responses, consider the following approaches:
    - **TypeScript Interface/Type Assertion**: For instance, in a controller function like `const { email, password } = req.body`, `email` and `password` are of type `any`. To enforce type safety, define an interface or type and use TypeScript assertion:
        ``` TypeScript
        interface AuthUser {
            email: string;
            password: string;
        }

        const { email, password } = req.body as AuthUser;
        ```
    - **Runtime Validation with Libraries**: TypeScript assertions ensure type safety at compile time. For runtime validation, use libraries like `joi`, `express-validator`, or `class-validator`. These tools validate the structure and content of the request body, ensuring that data conforms to the specified types at runtime.

By implementing these methods, you can enhance the type safety of your backend controllers, ensuring a more robust and error-resistant application.

#### Challenges in Reusing Mongoose Schemas with TypeScript

Turning Mongoose schema definitions into usable TypeScript types or interfaces presents unique challenges, especially when a schema references others. This is evident in complex projects where schemas interlink, like `orderSchema` referencing `user` and `product` in this project. 

Key issues include:
- **Automatic Property Addition by Mongoose/MongoDB**: Mongoose or MongoDB automatically adds properties such as `_id` and `createdAt` to each document. TypeScript, unaware of these automatic additions, often flags them as errors. For instance, in `ProfileScreen.tsx`, accessing `order._id` triggers a TypeScript error: "Property `_id` does not exist on type 'OrderModelType'." The reason is TypeScript's lack of awareness of these automatically added properties.

To address this:
- **Manual Property Addition in TypeScript Types**: Extend TypeScript types to include these properties. For example:
  ``` typescript
  type OrderModelType = InferredOrderType & {
    _id: Types.ObjectId;
    user: UserModelType;
  };
  ```
  This approach, while effective, can become cumbersome in larger projects with multiple schemas and models due to the repetitive nature of manually adding these properties.

Navigating this aspect of Mongoose and TypeScript integration requires careful planning to maintain type safety without excessive manual type extensions, especially in more extensive projects.

### Security Concerns with Manipulating Redux DevTools for Accessing Private Routes

#### Issue with Private Routing in `react-router-dom`

The implementation of a private route in React using `react-router-dom` is shown below:
``` typescript
const PrivateRoute = () => {
	const { userInfo } = useSelector((state: RootState) => state.auth)
	
	if (!userInfo) {
		return <Navigate to='/login' replace/>
	}
	return <Outlet />
}
```
This example demonstrates a PrivateRoute component that grants access only after user authentication.

#### Potential Security Vulnerability

- **Manipulation through Redux DevTools**: The reliance on `userInfo` stored in the Redux store for frontend private routing introduces a potential security vulnerability.
    - **Dispatching Actions via Redux DevTools**: An individual could potentially use Redux DevTools in the browser to dispatch an action like `{ type: 'auth/setCredentials', payload: {isAdmin: true} }`. This action would artificially set `userInfo` in the Redux store, granting unauthorized access to private and admin routes.
    - **Dual Role of `auth/setCredentials`**: The action `auth/setCredentials` performs two functions:
        1. Storing the `userInfo` object in the Redux store.
        2. Storing the same `userInfo` in localStorage.
    - **Accessing Protected Routes**: Due to this, manipulating `userInfo` through Redux DevTools can potentially provide unwarranted access to frontend private and admin routes.

This highlights a critical security issue in using client-side state management for access control. A robust backend authentication and authorization check should always accompany such measures to ensure secure access control.