// import React, { useState } from 'react';
// import './SignUp.css';
// // import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Simulate login logic
   
//     if (email === 'example@example.com' && password === 'password') {
//       setLoggedIn(true);
//       console.log('Logged in successfully');
//     } else {
//       console.log('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {loggedIn ? (
//         <p>You are logged in!</p>
//       ) : (
//         <form onSubmit={handleLogin}>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       )}
//     </div>
//   );
// };

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [registered, setRegistered] = useState(false);

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Simulate signup logic
  
//     if (password === confirmPassword) {
//       setRegistered(true);
//       console.log('Registered successfully');
//     } else {
//       console.log('Passwords do not match');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       {registered ? (
//         <p>Registration successful!</p>
//       ) : (
//         <form onSubmit={handleSignup}>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Signup</button>
//         </form>
//       )}
//     </div>
//   );
// };

// const SignUpPage = () => {
//   return (
//     <div className='SignUpPage'>
//       <Login />
//       <Signup />
//     </div>
//   );
// };

// export default SignUpPage;