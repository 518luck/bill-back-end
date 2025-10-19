declare module 'snowflake-id' {
  interface SnowflakeIdOptions {
    mid?: number;
    offset?: number;
  }

  class SnowflakeId {
    constructor(options?: SnowflakeIdOptions);
    generate(): number;
  }

  export default SnowflakeId;
}
