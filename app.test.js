const request = require("supertest");
// const mysql = require("mysql2");
const server = require("./bin/www");
// const http = require("http");
const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhcmlzIiwiZW1haWwiOiJhcmlzQG1haWwuY29tIiwicm9sZSI6IjEiLCJpYXQiOjE2NzU0ODk5MTIsImV4cCI6MTY3NTU3NjMxMn0.s34nuf1topdKMrwbHxaxin0cHiGNo_g2EmJKJeh9k40";

describe("Root API", () => {
  it("GET / --> data root", () => {
    return request(server).get("/").expect(200);
  });
  it("GET / --> data root not found", () => {
    return request(server).get("/asdsa").expect(404);
  });
});

describe("Auth User API", () => {
  it("POST / --> login", () => {
    return request(server)
      .post("/users/v1/login")
      .send({
        email: "aris@mail.com",
        password: "123456",
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("POST / --> login email not registered", () => {
    return request(server)
      .post("/users/v1/login")
      .send({
        email: "binasdar@mail.com",
        password: "123456",
      })
      .expect("Content-Type", /json/)
      .expect(404);
  });

  it("POST / --> login password wrong", () => {
    return request(server)
      .post("/users/v1/login")
      .send({
        email: "binar@gmail.com",
        password: "binur",
      })
      .expect("Content-Type", /json/)
      .expect(404);
  });

  it("POST / --> login errror", () => {
    return request(server)
      .post("/api/v1/login")
      .send({
        email: "",
        password: "",
      })
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

describe("Product API", () => {
  it("GET / All products", () => {
    return request(server)
      .get("/product")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("GET / All products Not Auth", () => {
    return (
      request(server)
        .get("/product")
        // .set("Authorization", `Bearer ${tokenAdmin}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });
});

describe("Kategori API", () => {
  it("GET Kategori", () => {
    return request(server)
      .get("/kategori")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET Kategori No Auth", () => {
    return (
      request(server)
        .get("/kategori")
        // .set("Authorization", `Bearer ${tokenAdmin}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  it("GET / kategori by id ", () => {
    return request(server)
      .get("/kategori/1")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("GET / kategori by id No Auth", () => {
    return request(server)
      .get("/kategori/1")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("Stock API", () => {
  it("GET Stock", () => {
    return request(server)
      .get("/allstock")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("GET Stock No Auth", () => {
    return request(server)
      .get("/allstock")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("Sales API", () => {
  it("GET All Sales", () => {
    return request(server)
      .get("/allsales")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("GET All Sales No Auth", () => {
    return request(server)
      .get("/allsales")
      .expect("Content-Type", /json/)
      .expect(401);
  });
  it("GET Sales Per Month", () => {
    return request(server)
      .get("/salesbymonth")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("GET Sales Per Month No Auth", () => {
    return request(server)
      .get("/salesbymonth")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});
