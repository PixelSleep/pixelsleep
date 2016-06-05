import { expect } from 'chai';
import { pad, calculateDifference } from './time';

describe('time', () => {
  describe('pad', () => {
    it('should left pad correctly', () => {
      expect(pad(0)).to.equal('00');
      expect(pad('0')).to.equal('00');
      expect(pad(10)).to.equal('10');
      expect(pad('10')).to.equal('10');
      expect(pad(100)).to.equal('100');
      expect(pad('100')).to.equal('100');
      expect(pad('010')).to.equal('010');
    });
  });
  describe('#calculateDifference', () => {
    it('should calculate the correct time given 2 valid times', () => {
      expect(calculateDifference('00:00', '12:00')).to.equal('12:00');
      expect(calculateDifference('12:00', '12:00')).to.equal('00:00');
      expect(calculateDifference('11:59', '12:01')).to.equal('00:02');
      expect(calculateDifference('23:59', '00:01')).to.equal('00:02');
    });
  });
});
