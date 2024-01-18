export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const token = getRequestHeader(event, "authorization");
  console.log(id);
  try {
    const response = await fetch(`http://127.0.0.1:8000/projects/${id}/`, {
      method: "get",
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 408,
        statusMessage: "unauthorized access",
      });
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err, " from project details");
    throw createError({
      statusCode: 500,
      statusMessage: "check the server",
    });
  }
});
