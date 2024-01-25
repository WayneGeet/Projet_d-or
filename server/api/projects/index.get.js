export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log(query.search);
  try {
    const token = getRequestHeader(event, "authorization");
    const response = await fetch(
      `http://127.0.0.1:8000/projects/?search=${query.search}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    if (!response.ok) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 408,
        statusMessage: "unauthorized access",
      });
    } else {
      const gis_data = await response.json();
      return gis_data;
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "check the server",
    });
  }
});
