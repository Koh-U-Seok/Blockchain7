import Block from "../block/block";

class Chain {
  #chain: Array<Block>;
  #DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  #BLOCK_GENERATION_INTERVAL: number = 1;
  #TIME_UNIT: number = 1 * 1000;

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    this.#chain.push(genesis);
  }

  get chain(): Array<Block> {
    return [...this.#chain];
  }

  get lastBlock(): Block {
    return this.#chain[this.#chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
    };
  }

  get adjustmentBlock(): Block {
    const length = this.#chain.length;
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.#chain[0];
    return this.#chain[interval];
  }

  addBlock(_data: Array<string>): Block {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );

    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: Block): Block {
    const isValid: TError<string> | TResult<IBlock> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }
}

export default Chain;
