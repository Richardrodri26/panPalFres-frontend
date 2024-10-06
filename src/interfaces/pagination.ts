export interface IPagination {
  take: number;
  skip: number;
}

export interface IMetadataPagination {
  currentPage: number;
  totalPages: number;
}

export interface IBackendPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}


export interface WrapDataWithPagination<T> extends IBackendPagination {
  data: T
}