import { describe, it } from "mocha";
import Chai from "chai";
import ChaiHttp from "chai-http";

import App from "../app";

let should = Chai.should();
Chai.use(ChaiHttp);
Chai.use(require("chai-things"));

const server = new App({ PORT: 3000 }).getServer();

describe("vehicle tests", () => {
  it("test create vehicle", async (done) => {
    const dataCopy = {
      board: "CED",
      chassi: "U-BB",
      reindeer: "B12C",
      brand: "FORD",
      model: "Camaro",
      year: "2015",
    };

    Chai.request(server)
      .post("/api/v1/vehicles")
      .send(dataCopy)
      .end((err, res) => {
        res.should.have.status(200);
      });

    done();
  });

  it("Test to delete non-existent vehicle", async (done) => {
    const dataCopy = {
        board: "CAD",
        chassi: "U-BK",
        reindeer: "B13C",
        brand: "FORD",
        model: "Camaro",
        year: "2015",
      };
  
      Chai.request(server)
        .post("/api/v1/vehicles")
        .send(dataCopy)
        .end((err, res) => {
          Chai.request(server)
            .get("/api/v1/vehicles/3f1565a0-10c7-4a62-8dba-e31a3e623caf")
            .end((err, res) => {
                res.should.have.status(404);
            });
        });
    done();
  })

  it("Test delete vehicle", async (done) => {
      Chai.request(server)
        .delete("/api/v1/vehicles")
        .end((err, res) => {
          Chai.request(server)
            .get("/api/v1/vehicles/"+res.body.model.id)
            .end((err, res) => {
                res.should.have.status(200);
            });
        });
    done();
  })
});
