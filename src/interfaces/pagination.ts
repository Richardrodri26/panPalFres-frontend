export interface IPagination {
  take: number,
  skip: number
}

export interface IMetadataPagination {
  currentPage: number
  totalPages: number
}