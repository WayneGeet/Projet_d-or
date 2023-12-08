export default defineEventHandler(async (event) => {
  try {
    const access = await useStorage().getItem("access");
    console.log(access + " this is access from projects");
    const response = await fetch("http://127.0.0.1:8000/projects/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    if (!response.ok) {
      return { message: "something went wrong" };
    }
    const gis_data = await response.json();
    return gis_data;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "didn't make the trip to the server",
    });
  }
});
