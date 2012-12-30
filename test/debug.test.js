define(['debug'],
function(debug) {

  describe("debug", function() {

    it('should export function', function() {
      expect(debug).to.exist;
      expect(debug).to.be.a('function');
    });

    it('should export enable', function() {
      expect(debug.enable).to.exist;
      expect(debug.enable).to.be.a('function');
    });

  });
  
  return { name: "test.debug" }
});
