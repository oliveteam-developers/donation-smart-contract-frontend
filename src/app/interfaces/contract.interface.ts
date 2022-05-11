export interface IContractInfo {
  address?: string;
  factory?: IContractItem;
  donation?: IContractItem;
}

export interface IContractItem {
  abi?: any;
}

export interface ICreateContract {
  minimumContribution?: number;
}