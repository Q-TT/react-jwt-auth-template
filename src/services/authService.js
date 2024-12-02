// src/services/authService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;


const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    //!convert response to json
    const json = await res.json();
    //! check error from server
    if (json.err) {
      throw new Error(json.err);
    }
    console.log(json)
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const signin = async (user) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await res.json();
  
      if (json.error) {
        throw new Error(json.error);
      }
    // This part of the code splits the JWT string into its three components using the dot as a delimiter and selects the second element (index 1), which is the payload containing the user data.
      if (json.token) {
        const user = JSON.parse(atob(json.token.split('.')[1]));
        console.log(user)
        return user;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  

  export { 
    signup, 
    signin };
  


