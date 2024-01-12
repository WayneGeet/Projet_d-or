export default defineEventHandler(async (event) => {
  const { refresh: refr } = await readBody(event);
  const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refr,
    }),
  });
  if (!response.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: "something went wrong!",
    });
  }
  const { access, refresh } = await response.json();
  // await useStorage().setItem("access", access);
  // await useStorage().setItem("refresh", access);
  return { access, refresh };
});
