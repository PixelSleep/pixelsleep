import { expect } from 'chai';
import { calculateDifference } from './time';

describe('time', () => {
  describe('#calculateDifference', () => {
    it('should return the correct time', () => {
      expect(calculateDifference('00:00', '12:00')).to.equal('12:00');
      expect(calculateDifference('12:00', '12:00')).to.equal('00:00');
      expect(calculateDifference('11:59', '12:01')).to.equal('00:02');
      expect(calculateDifference('23:59', '00:01')).to.equal('00:02');
    });
  });
});
