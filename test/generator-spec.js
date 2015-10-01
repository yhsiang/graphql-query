import Generator from '../src';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('generator', () => {
  it('simple object should return graphql query ', () => {
    const data = { hello: "world" };
    expect(Generator(data)).to.equal(`{ hello }`)
  });

  it('should return graphql query', () => {
    const data = {ReadTracking: {name: ""}};
    expect(Generator(data)).to.equal(`ReadTracking {\n  name\n}`)
  });

  it('array of object should return graphql nested query', () => {
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
});
