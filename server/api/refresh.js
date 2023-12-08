export default defineEventHandler(async (event) => {
  const refr = await useStorage().getItem("refresh");
  console.log(refr, "this is from the damn refresh server");
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
    console.log();
    return { message: "Refresh refused to refresh" };
  }
  const { access, refresh } = await response.json();
  await useStorage().setItem("access", access);
  await useStorage().setItem("refresh", refresh);
  return { message: "success" };
});
