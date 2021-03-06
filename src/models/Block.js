var sha256 = require('sha256');
var converter = require('hex2dec');

class Block {


  constructor(difficulty, prevHash = "0000000000000000", transactions = []){
    this.number = Block.incrementNumber();
    this.prevHash = prevHash
    this.hash = null;
    this.transactions = transactions;
    this.nonce = 0;
    this.difficulty = difficulty;
    this.attributes = [this.difficulty, this.prevHash, this.hash]
    this.convertToHash();
    this.processAttributes();
  }

  static incrementNumber() {
    if (!this.number) this.number = 1
    else this.number++
    return this.number
  }

  convertToHash(){
    const concat = this.number.toString() 
    + this.prevHash.toString() 
    + this.transactions.toString() 
    + this.nonce.toString();
    const decimal = converter.hexToDec(sha256(concat))
    this.hash = decimal / (10 ** (77 - 16))
    this.attributes[2] = this.hash;
  }

  addToNonce(){
    this.nonce++
    this.convertToHash()
    this.processAttributes();
  }

  processAttributes(){
    const processedAttributes = this.attributes.map((attribute) => {
      var number = Math.round(parseInt(attribute));
      if(number.toString().length < 18){
        let arr = number.toString().split('');
        while(arr.length < 16){
          arr.unshift("0")
        }
        return arr.join('').toString(); 
      }

    })
    this.attributes = processedAttributes;
  }

}

export default Block;