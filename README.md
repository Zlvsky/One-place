<div id="top"></div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Zlvsky/One-place">
    <img src="readmeimages/logo.png" alt="Logo" width="200" height="70">
  </a>

<h3 align="center">One Place</h3>

  <p align="center">
    This is my first self made bigger project that I was working on recently. It is CRM, CRUD app built on: front-end: react, back-end: node.js, express, mysql.
    <br />
    Main purpose of this project is to manage business based on orders that don't need online shop.
    <br />
    For example selling items on livestreams.
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## Showcase of project

<h3>Login page</h3>
<p>Page content is restricted to logged in users only</p>
<p>Authentication is based on <a href="https://www.npmjs.com/package/passport">passport</a> middleware</p>
<p>Accounts are stored in mysql database and passwords are hashed via <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a> library </p>
<img src="https://user-images.githubusercontent.com/45123514/162189773-c7c035d7-b52d-4654-bb1a-cdda27cc58ea.gif" />
<br/>

<h3>Homepage</h3>
<p>In homepage there are summaries of orders, clients, upcoming events etc.</p>
<p>There is interactive graph which shows total earnings by past 12 months based on actual date</p>
<img src="https://user-images.githubusercontent.com/45123514/162190382-338c0dc7-639b-45cf-9342-b4b6f423875e.gif" />

<h3>Orders page</h3>
<p>Orders are fetched from database and displayed in filtered array</p>
<img src="https://user-images.githubusercontent.com/45123514/162190759-58e73ba7-0e1c-4afe-b92a-5097d9ebdc0b.gif" />

<h3>Adding new orders</h3>
<p>Users can add new orders</p>
<p>New orders can be assigned to existing clients or new client can be added</p>
<img src="https://user-images.githubusercontent.com/45123514/162191057-c07a7d83-ff92-4de5-b50e-27daf49ad01d.gif" />

<h3>Order page by ID</h3>
<p>Each order have it's individual page</p>
<img src="https://user-images.githubusercontent.com/45123514/162191105-b0fa7a0c-4001-4ce2-93d8-dd1db044eb0e.gif" />

<h3>Clients page</h3>
<p>Works similar as order pages</p>
<p>Clients can be added by users</p>
<p>Each client have his own individual page, with content like: total orders, total spendings etc.</p>
<img src="https://user-images.githubusercontent.com/45123514/162191602-9e22fe4a-580a-40d8-ac5d-e2b3e3a899c5.gif" />

<h3>Events calendar page</h3>
<p>Users can add upcoming events</p>
<p>Events are separeted to 2 pieces</p>
<p>First piece are current and upcoming events</p>
<p>Second piece are expired events</p>
<p>Events are filtered by date: closest events are at top</p>
<img src="https://user-images.githubusercontent.com/45123514/162192249-74d12978-c011-44e9-97a9-5e17fc422ab4.gif" />

<h3>Admin panel</h3>
<p>If logged user is admin, he have access to admin panel</p>
<p>For that moment he can add new users, aswell as deleting them</p>
<img src="https://user-images.githubusercontent.com/45123514/162192533-ab2e025f-99ea-4fec-a42e-45d1bbb00b4a.gif" />

<h3>Additional info</h3>
<p>I've styled the whole app with pure CSS by myself</p>
<p>The app was designed to be non-scrollable.</p>
<p>I've decided to not use next.js to improve my node.js skills and learn more about front-end --- back-end synergy</p>


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Passport](https://www.npmjs.com/package/passport)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Zlvsky/One-place.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create and configure your .env file
   ```js
    DB_HOST='127.0.0.1'
    DB_USER=''
    DB_PASSWORD=''
    DATABASE=''
   ```
4. Import sql database template to server (one-place.sql)
5. Add first admin account
6. Run app with <a href="https://www.npmjs.com/package/concurrently">concurrently</a> library (node.js and react app at the same time)
   ```sh
   npm run dev | npm run build
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

