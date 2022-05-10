export interface IContractInfo {
  address?: string;
  factory?: IContractItem;
  donation?: IContractItem;
}

export interface IContractItem {
  abi?: any;
}