export default defineEventHandler(async (event) => {
  try {
    const { slug } = getRouterParams(event, "slug");
    console.log(slug, "from put");
    const fd = await readFormData(event);
    console.log(fd, "this is the formdata");

    const token = getRequestHeader(event, "authorization");
    const response = await fetch(`http://127.0.0.1:8000/profile/${slug}/`, {
      method: "put",
      headers: {
        Authorization: token,
      },
      body: fd,
    });
    if (!response.ok) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 401,
        statusMessage: "unauthorized access",
      });
    } else {
      setResponseStatus(event, 204);
      return { message: "profile updated" };
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "check the server",
    });
  }
});
