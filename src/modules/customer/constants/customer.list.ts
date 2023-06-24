import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const CUSTOMER_DEFAULT_ORDER_BY = 'createdAt';
export const CUSTOMER_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const CUSTOMER_DEFAULT_PER_PAGE = 20;
export const CUSTOMER_DEFAULT_AVAILABLE_ORDER_BY = ['name', 'createdAt'];
export const CUSTOMER_DEFAULT_AVAILABLE_SEARCH = ['name'];
