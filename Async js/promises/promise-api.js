const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result));

const c = Promise.reject(new Error("reason for rejection"));
c.catch((res) => console.log(res));
