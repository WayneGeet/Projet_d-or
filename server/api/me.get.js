export default defineEventHandler(async (event) => {
  const token = getRequestHeader(event, "authorization");
  const { slug } = getRouterParams(event, "slug");

  // const { slug } = await readBody(event);

  console.log("user slug param", slug);
  try {
    const response = await fetch(`http://127.0.0.1:8000/users/${slug}/me/`, {
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    console.log("slug", slug);
    console.log("response", response);

    if (response.ok) {
      const user_data = await response.json();
      console.log("this is user", response);
      return user_data;
    } else console.log("something went wrong (else block)");
  } catch (error) {
    console.log("Something went wrong:", error, response.status);
  }
});
