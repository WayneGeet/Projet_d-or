export const getAuthTokenFromServer = async ( initialiseMap = false) => {
  try {
    const { data: response } = await useFetch(
      "localhost:5500/ee-api/getAuthToken/"
    );
    console.log(response);
    const [, token] = response.split(" ");
    window.ee.data.setAuthToken(
      "",
      "Bearer",
      token,
      3600,
      [],
      undefined,
      false
    );
    if (initialiseMap) {
      window.ee.initialize(null, null, createMap, (e) => {
        console.error("Initialization error: " + e);
      });
    }
  } catch (e) {
    this.$message.error(e.toString());
  }
};
