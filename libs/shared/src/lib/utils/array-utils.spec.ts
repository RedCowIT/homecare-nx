import './entity-utils';
import {Dictionary} from "@ngrx/entity";
import {arrayDiff, entityMapValues} from "@engagewall/shared";

class TestDict extends Dictionary<number> {

}

describe('ArrayUtils', () => {

  it('should return difference between arrays', () => {

    expect(arrayDiff([1, 2, 3], [3, 2, 1])).toEqual([]);
    expect(arrayDiff([1, 2, 3], [3, 1])).toEqual([2]);
    expect(arrayDiff([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(arrayDiff(['a', 'b', 'c'], ['b'])).toEqual(['a', 'a']);

  });
});
