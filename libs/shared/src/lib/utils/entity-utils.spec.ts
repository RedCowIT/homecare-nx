import './entity-utils';
import {Dictionary} from "@ngrx/entity";
import {entityMapValues} from "@engagewall/shared";

class TestDict extends Dictionary<number> {

}

describe('EntityUtils', () => {

  it('should return present key values', () => {

    const dict = new TestDict();
    dict['a'] = 1;
    dict['b'] = 2;
    dict['c'] = 3;

    expect(entityMapValues(dict,  ['a', 'c'])).toEqual([1, 3]);

    expect(entityMapValues(dict,  ['a', 'b', 'c', 'd'])).toEqual([1, 2, 3]);

  });
});
