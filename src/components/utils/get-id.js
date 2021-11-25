export default async function getId() {
  const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/isLogin`, {
    method: "GET",
    headers: {
      "Conent-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await result.json();

  if (data.name === null) {
    return { isLogin: false };
  } else {
    return { isLogin: true, nickname: data.nickname };
  }
}
