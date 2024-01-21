export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event, "slug");
  console.log(slug, "from get");
  try {
    const token = getRequestHeader(event, "authorization");
    const response = await fetch(
      `http://127.0.0.1:8000/users/profiles/${slug}/`,
      {
        method: "get",
        headers: {
          Authorization: token,
        },
      }
    );
    if (!response.ok) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 401,
        statusMessage: "unauthorized access",
      });
    } else {
      const profile_data = await response.json();
      console.log(profile_data, "this is the photo url");
      return profile_data;
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "check the server",
    });
  }
});
