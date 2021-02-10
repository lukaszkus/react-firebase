import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import {FirebaseContext} from '../Firebase'
import * as ROUTES from '../../constants/routes'

function SignUpPage () {
    return (
        <div>
            <h1>SignUp</h1>
            <FirebaseContext.Consumer>
              {firebase => <SignUpForm firebase={firebase}/>}
            </FirebaseContext.Consumer>
        </div>
    )
}

function SignUpForm ({firebase}) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    // const [error, setError] = useState(null);

    const submitFrom = (e) => {
      e.preventDefault();
      
      firebase.auth().doCreateUserWithEmailAndPassword(userName, email, passwordOne)
            .then(()=> {
            console.log('Added to firebase');
        }).catch(err => {
            console.log(err);
        })
    }

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      userName === '';


    return (
        <form onSubmit={submitFrom}>
            <input
              name="username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
            <input
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={e => setPasswordOne(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={e => setPasswordTwo(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />

            <button type="submit" disabled={isInvalid}>Sign Up</button>
    
            {/* {error && <p>{error.message}</p>} */}
        </form>
    )
}


function SignUpLink() {
    return (
        <p>
            Nie masz konta? <Link to={ROUTES.SIGN_UP}>Zarejestruj się</Link>
        </p>
    )
}




export default SignUpPage;
export {SignUpForm, SignUpLink}
