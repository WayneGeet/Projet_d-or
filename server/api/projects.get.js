export default defineEventHandler(async (event) => {
  try {
    const access = await useStorage().getItem("access");
    const response = await fetch("http://127.0.0.1:8000/projects/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    if (!response.ok) {
      // await useStorage().setItem("access", "");
      // await useStorage().setItem("refresh", "");
      // await useStorage().setItem("user", "");
      // await useStorage().clear();
      throw createError({
        statusCode: 401,
        statusMessage: "unauthorized access",
      });
    } else {
      const gis_data = await response.json();
      return gis_data;
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "unauthorized access",
    });
  }
});
