export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event, "slug");
  try {
    const token = getRequestHeader(event, "authorization");
    const response = await fetch(`http://127.0.0.1:8000/profile/${slug}/`, {
      method: "get",
      headers: {
        Authorization: token,
      },
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
