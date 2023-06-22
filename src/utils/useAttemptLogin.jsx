export const useAttemptLogin = () => {
  const userAttempt = () => {
    console.log("user");
  };

  const adminAttempt = () => {
    console.log("admin");
  };

  return { userAttempt, adminAttempt };
};
