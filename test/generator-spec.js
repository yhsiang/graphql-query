import Generator from '../src';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('generator', () => {
  it('should return graphql query with simple object.', () => {
    const data = { hello: "world" };
    expect(Generator(data)).to.equal(`{ hello }`)
  });

  it('should return graphql query with nested object.', () => {
    const data = {ReadTracking: {name: ""}};
    expect(Generator(data)).to.equal(`ReadTracking {\n  name\n}`)
  });

  it('should return graphql nested query with objects of arrays.', () => {
    const data = { bills: [
      {
        id: "1537L17367",
        abstract: "本院委員林國正等20人，鑑於促進....",
        sponsors: [ {name: "林國正"} ],
        cosponsors: [ {name: "孫大千"} ]
      }
    ]};
    const expected = `bills {\n  id\n  abstract\n  sponsors {\n    name\n  }\n  cosponsors {\n    name\n  }\n}`
    expect(Generator(data)).to.equal(expected);
  });

  it('should return graphql query with mongo-style condition.', () => {
    const data = { bill:
      {
        id: "1537L17367",
        abstract: "本院委員林國正等20人，鑑於促進....",
        sponsors: [ {name: "林國正"} ],
        cosponsors: [ {name: "孫大千"} ]
      }
    };
    const expected = `bill(id: 1537L17367) {\n  id\n  abstract\n  sponsors {\n    name\n  }\n  cosponsors {\n    name\n  }\n}`
    expect(Generator(data, {
      bill: { id: { $eq: "1537L17367" } }
    })).to.equal(expected);
  });
});
