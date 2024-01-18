export default defineEventHandler(async (event) => {
  try {
    const { slug } = event.context.params("slug");
    console.log(slug, "from put");
    const formdata = await readBody(event);
    console.log(formdata, "this is form data");

    const token = getRequestHeader(event, "authorization");
    const response = await fetch(
      `http://127.0.0.1:8000/users/profiles/${slug}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        body: formdata,
      }
    );
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
    throw createError({
      statusCode: 500,
      statusMessage: "check the server",
    });
  }
});
