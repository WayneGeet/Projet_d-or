export default defineEventHandler(async (event) => {
  try {
    const formdata = await readBody(event);
    const token = getRequestHeader(event, "authorization");
    const response = await fetch("http://127.0.0.1:8000/users/profile/", {
      method: "get",
      headers: {
        Authorization: token,
      },
      body: formdata,
    });
    if (!response.ok) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 401,
        statusMessage: "unauthorized access",
      });
    } else {
      const profile_data = await response.json();
      return profile_data;
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "check the server",
    });
  }
});
