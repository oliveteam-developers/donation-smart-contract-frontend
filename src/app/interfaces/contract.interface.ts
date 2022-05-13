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

export interface IListContractItem {
  id?: number;
  address?: string;
}

export interface IContractDetail {
  managerAddress?: string;
  minimumContribution?: string;
  requests?: string;
  contributers?: string;
  balance?: string;
}
