export const useAttemptLogin = () => {
  const userAttempt = () => {
    console.log("user");
    return true;
  };

  const adminAttempt = () => {
    console.log("admin");
    return false;
  };

  return { userAttempt, adminAttempt };
};
