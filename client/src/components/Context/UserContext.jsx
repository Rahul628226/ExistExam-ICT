export const AddUserLocalStorage = (user) => {
  console.log('Storing user data:', user);
  localStorage.setItem('name', user.firstName); // Assuming user object has an email property
};

export const getUserFromLocalStorage = () => {
  try {
    const result = localStorage.getItem('userEmail');
    console.log('Retrieved user data:', result);
    const user = result ? JSON.parse(result) : null;
    return user;
  } catch (error) {
    console.error("Error retrieving user from localStorage:", error);
    return null;
  }
};
