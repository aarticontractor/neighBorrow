## neighBorrow
#
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Open Source Initiative Link](https://opensource.org/licenses/MIT)
#

# Description: 
### NeighBorrow, a share app that allows households to share items and seek help from neighbors as a valuable solution for reducing redundant purchases and fostering community collaboration. Many people can't afford to purchase everything new, so we decided to make something where users can just borrow something like tools, gear, etc for a few days. Sharing items is not only good for the environment, it creates strong bonds and connections between you and your neighborhood

#
## Table of Contents:
- [Overview](#Overview)
- [The Challenge](#The-Challenge)
- [Requirements](#Requirements)
- [Built With](#Built-With)
- [Code Snippets](#Code-Snippets)
- [What We Learned](#What-We-Learned)
- [License](#License)
- [Authors](#Authors)
- [Acknowledgments](#Acknowledgments)
#

# Overview
#

## The Challenge:
### The project challenge is to create a collaborative MERN stack single-page application that addresses a real-world problem. The application should incorporate a scalable MongoDB back end, GraphQL API, Express.js and Node.js server, and React front end. It should also implement user authentication with JWT, utilize agile development methodologies, and adhere to high-quality coding standards. Additional suggestions include using CSS-in-JS or component libraries for styling and integrating the Stripe payment platform for payment functionality. The completed project should be added to the portfolio.
#

## Requirements for the Project:
### By following these instructions, you will be able to create an interactive MERN Stack single-page application that meets the project requirements and includes additional suggestions to enhance its quality and functionality.

- Start from scratch to revisit front-end abilities in the context of React and solidify understanding of working with multiple servers in a MERN application.
-  Use React for the front end.
- Use GraphQL with a Node.js and Express.js server.
- Use MongoDB and the Mongoose ODM for the database.
- Use queries and mutations for retrieving, adding, updating, and deleting data.
- Implement user authentication with JWT.
- Protect sensitive API key information on the server.
- Deploy the application using Heroku, ensuring that data is included.
- 10Create a polished UI that is mobile-friendly and responsive.
- Make the application interactive, accepting and responding to user input.
- Maintain a clean repository that adheres to quality coding standards, including file structure, naming conventions, best practices for class and ID naming conventions, indentation, and high-quality comments.
- Create a high-quality README with a unique name, description, technologies used, screenshot, and a link to the deployed application.
- Add the project to the portfolio created in Module 20.
- Consider implementing CSS styling options:
- Explore CSS-in-JS libraries like styled-components or Emotion.
- Use a component library such as Semantic UI, Chakra UI, or Ant Design.
- Create all CSS for the application using pure CSS.
* Optional: Consider integrating the Stripe payment platform for accepting payments or donations.
#
## Deployed Live Link:
[Click here for NeighBorrow live link](https://neighborrow.herokuapp.com/)

## Gif's of Project: 
## Figure 1.
### Below this gif is demonstrating the user login feature and pulling up the user's profile
![Untitled_ Jun 12, 2023 1_03 AM](https://github.com/aarticontractor/neighBorrow/assets/127444682/cca94bfd-1284-4954-ad28-f81dd79c58cc)
#
## Figure 2. 
### Below this gif is demonstrating the use of Lottie-React Files
![Untitled_ Jun 12, 2023 2_10 AM (1)](https://github.com/aarticontractor/neighBorrow/assets/127444682/73072f62-8359-4f5f-a150-2fc7e667a0cf)
#
## Figure 3. 
### Below this gif is demonstrating the search bar menu
![Untitled_ Jun 12, 2023 1_26 AM](https://github.com/aarticontractor/neighBorrow/assets/127444682/a3f07864-510c-4f68-8b54-ed555b823ca5)
#
## Built With:
- MongoDB: [Download MongoDB](http://www.docs.mongodb.com/manual/installation/)
- Express.js: [Download Express.js](http://www.github.com/expressjs/express)
- React: [Download React](http://www.reactjs.org/docs/getting-started.html)
- Node.js: [Download Node.js](http://www.nodejs.org/en/download/)
- GraphQL: [Download Graph.js](http://www.graphql.org/learn/)
- Mongoose ODM: [Download Mongoose ODM](http://www.mongoosejs.com/docs/index.html)
- Heroku: [Download Heroku](http://www.devcenter.heroku.com/)
- Styled-components: [Download styled-components](http://www.styled-components.com/)
- Emotion: [Download Emotion](http://www.emotion.sh/docs/introduction)
- Semantic UI: [Download Semantic UI](http://www.semantic-ui.com/introduction/getting-started.html)
- Chakra UI: [Download Chakra UI](http://www.chakra-ui.com/docs/getting-started)
- Ant Design: [Download Ant Design](http://www.ant.design/docs/react/introduce)
- Stripe: [Download Stripe](http://www.stripe.com/docs)
- License Badge: [MIT](https://opensource.org/licenses/MIT))
- Visual Studio Code: [Website](https://code.visualstudio.com/)
- Cloudinary: [Website](https://cloudinary.com/)
- Apollo Client: [Download]([)](https://www.apollographql.com/docs/react/get-started/)
- JWT: [Website](https://jwt.io/)
- Anime.js: [Download](https://animejs.com/)
- Lottie-React Files: [Website](https://lottiefiles.com/blog/working-with-lottie/how-to-use-lottie-in-react-app/)
- Redux: [Download](https://www.tutorialspoint.com/redux/redux_installation.htm)
#
## Code Snippets of our project
#

```sh

return (
    <main className={classes.card}>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Sign Up"
        />
        <CardContent className={classes.cardContent}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              className={classes.formInput}
              label="First Name"
              name="firstName"
              type="text"
              value={formState.firstName}
              onChange={handleChange}
              fullWidth
            />
            <Button
              className={classes.formInput}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );

**ABOVE: This snippet uses Material UI to craft a sign-up form. Card and TextField components form the structure and inputs, while a Button handles submissions. All components are stylized using classes generated by the makeStyles function.

```
#

```sh

useEffect(() => {
  const filterByUser = () => {
    if (data) {
      let active = [], expired = [];
      data.getProducts.forEach(product => {
        if (product.user._id === user.userId) {
          if (checkDate(product.start_date, product.end_date)) active.push(product);
          else expired.push(product);
        }
      });
      setActiveProducts(active);
      setExpiredProducts(expired);
    }
  }
  filterByUser();
}, [products, data]);
  
**ABOVE: After fetching the products data, a useEffect hook is used to filter and assign active and expired products based on the product ownership and date. It segregates the products belonging to the current user into active or expired categories.
```
#

```sh

<ProductList products={activeProducts} handleDelete={handleDelete} handleEdit={handleEdit} handleRelist={handleRelist} active={true} expired={false} />
</TabPanel>
<TabPanel value={activeTab} index={1}>
  <ProductList products={expiredProducts} handleDelete={handleDelete} handleEdit={handleEdit} handleRelist={handleRelist} active={false} expired={true} />
</TabPanel>





**ABOVE: The ProductList components use activeProducts and expiredProducts arrays to render product listings. They offer delete, edit, and re-list functions through passed handlers. Updating these arrays triggers automatic re-rendering, keeping product listings up-to-date.

```
#

```sh

 addProduct: async (_, { name, description, image, price, categoryId, userId, start_date, end_date }) => {

            const newProduct = new Product({
                name,
                description,
                image,
                price,
                category: categoryId,
                user: userId,
                start_date,
                end_date,
            });

            return await newProduct.save();
        },



**ABOVE: Here is the resolver mutation to Add a new product where it uses the ‘.save’ method to save the new Product in the Product model

```
#

## What We Learned:
###Throughout the course of our project, we grappled with numerous challenges that ultimately fortified our technical prowess. Implementing Redux presented a steep learning curve, however, it also allowed us to better understand the intricacies of managing application state and ensuring smooth data flow.

We encountered and resolved compatibility issues between React-lottie and node v16, learning to address deprecation errors in the process. The solution, which involved using the command 'npm i --legacy-peer-deps', served as a temporary fix, reinforcing our understanding of dependency management in Node.js.

Lastly, our attempts to integrate Cloudinary from the server-side were met with several obstacles. Transitioning to a client-side approach eventually resolved these issues, offering us valuable insights into flexible problem-solving and the importance of adaptability in the deployment of third-party services. This experience bolstered our capacity to assess, adjust and implement complex integrations in the software development process.


## License & Copyright ©
#
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Open Source Initiative Link](https://opensource.org/licenses/MIT)

#
### Copyright © 2023 NeighBorrow Team
#
```md

MIT License

Copyright (c) 2023 NeighBorrow Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, srcribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
#
## Authors

- Follow us on Github at [AmandaGray](https://github.com/Berkeleycodingmomma)! 
- Follow us on Github at [AartiContractor](https://github.com/aarticontractor)! 
- Follow us on Github at [KaidenParcher]()! 
- Follow us on Github at [LaurieFish]()! 


## Acknowledgments

-UC Berkeley Extension, Coding Bootcamp

-Shout out to Instructor Jerome Chenette and all his TA's: Manuel Nunes, Kyle Vance, and James Harding
#
© 2023 [NeighBorrowTeam](https://github.com/aarticontractor/neighBorrow)! Confidential and Proprietary. All Rights Reserved.
